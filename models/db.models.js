const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/user_authentication',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => console.log('mongodb connected'))
    .catch( err => console.log(err))

