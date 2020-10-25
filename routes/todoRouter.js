const router = require('express').Router();
const auth = require('../middleware/auth');
const todo = require('../models/todo.models');

router.route('/addtodo').post( auth, async (req, res) => {
    try {
        const { district, village } = req.body;

        if(!district || !village)
            return res.status(400).json('Not all field have been entired');
        
        const newtodo  = new todo({
            district,
            village,
            userId: req.user
        });
        const tododata = await newtodo.save();
        res.json(tododata);
    }
    catch (err) {
        res.status(500).json({Error: err.message});
    }
});

// find specefic user
router.get('/all', auth, async (req, res) => {
    const findtodolist = await todo.find({userId: req.user});
    res.json(findtodolist);
});

// delete user todolist data
router.delete('/:id', auth, async (req, res) => {
    const todos = await todo.findOne({userId: req.user, _id: req.params.id });
    if(!todos) 
        return res.status(400).json({
            msg: "No todo found with this ID that belongs to the current user."
        });
    
    const deleteitem = await todo.findByIdAndDelete(req.params.id);
    res.json({
        message: 'This item successfully deleted',
        deleteitem: deleteitem._id
    });
});


module.exports = router;