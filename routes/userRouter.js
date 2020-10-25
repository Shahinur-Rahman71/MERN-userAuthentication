const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Users = require('../models/user.models');

// For Registration
router.route('/register').post( async (req, res) => {
    try {
        const { email, password, passwordCheck} = req.body;
        let { displayName } = req.body;

        // validation
        if (!email || !password || !passwordCheck)
            return res.status(400).json({ msg: 'Not all field have been entered' });

        if (password !== passwordCheck)
            return res.status(400).json({ msg: 'Enter the same password twice for validation' });

        if (password.length < 5)
            return res.status(400).json({ msg: 'The password need to be at least 5 characters long.' });
       

        // account check
        const existingUser = await Users.findOne({email: email});
        if(existingUser)
            return res.status(400).json({ msg: 'An account with this email already exists' });

        if(!displayName) displayName = email;
        
        // password hashing
        const salt = await bcrypt.genSalt();
        const passwordHass = await bcrypt.hash(password, salt);
        // console.log(passwordHass);

        // Save date on db
        const newUser = new Users({
            email,
            password: passwordHass,
            displayName
        });
        const userData = await newUser.save();
        res.json(userData);

    }
    catch (err) {
        res.status(500).json({Error: err.message})
    }

});

// For Login
router.post('/login', async (req, res) => {
    
    try{
        const {email, password} = req.body;
        
        // validate
        if(!email || !password){
            return res.status(400).json({ msg: 'Not all field have been entered' });
        }

        const user = await Users.findOne({email});
        // console.log(user);
        
        if(!user) 
            return res.status(400).json({msg: 'No account with this email hass been registered'})

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({msg: 'Invalid Password'});

        // for token => here JWT_SECRT is initialize on the .env file
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName
            }
        });
    
    }
    catch (err) {
        res.status(500).json({Error: err.message})
    }

});

// delete user
router.delete('/delete', auth, async (req, res) => {
    // console.log('from delete',req); // user: '5f7ebb203221081594995da9' will be found
    
    try{
        const deleteuser  = await Users.findByIdAndDelete(req.user);
        res.json(deleteuser);
    }
    catch (err) {
        res.status(500).json({ErrorInAuth: err.message})
    }
});

// check token validation
router.post('/tokenValidation', async (req, res) => {
    try{
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);

        const user = await Users.findById(verified.id)
        if(!user) return res.json(false);

        res.json(true);
    } 
    catch (err) {
        res.status(500).json({Error: err.message});
    }

});

// find user
router.get('/', auth, async (req, res) => {
    const findUser = await Users.findById(req.user);
    res.json({
        displayName: findUser.displayName,
        id: findUser._id
    });
});

module.exports = router;