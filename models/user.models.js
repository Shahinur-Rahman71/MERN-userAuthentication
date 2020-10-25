const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const userSchmea = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    displayName: {
        type: String
    }
});

module.exports = model('user', userSchmea);