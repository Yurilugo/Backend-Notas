require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const cors = require('cors');

(async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('conecto a mon');      
    } catch (error){
        console.log('no conecto a mon')
    }
})();


app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use('/api/users', usersRouter);



module.exports = app;