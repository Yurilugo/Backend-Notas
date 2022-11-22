require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todos');
const logoutRouter = require('./controllers/logout');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
const authExtractor = require('./middleware/auth');
const { MONGO_URI } = require('./config');

(async () =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('conecto a mon');      
    } catch (error){
        console.log('no conecto a mon')
    }
})();


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/todos', authExtractor ,todosRouter);


//Frontend routes
app.use('/',express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/login',express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/Resgistration',express.static(path.resolve(__dirname, 'views', 'Resgistration')));
app.use('/app/:id',express.static(path.resolve(__dirname, 'views', 'app')));




module.exports = app;