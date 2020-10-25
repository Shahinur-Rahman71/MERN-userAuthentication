const express = require('express');
const cors = require('cors');
require('dotenv').config();

// set a express 
const app = express();
app.use(express.json());
app.use(cors());

// mongodb connection
require('./models/db.models');

// router connection
app.use('/users', require('./routes/userRouter'));
app.use('/todo', require('./routes/todoRouter'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});