const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    district: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }
});

module.exports = model('todolist', todoSchema);