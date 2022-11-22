const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { request, response } = require('../app');


usersRouter.post('/', async (request, response) =>{
    const { email, password } = request.body;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;

    const userExist = await User.findOne({email});

    if (!PASSWORD_REGEX.test(password)) {
        return response.status(400).json({error: 'la contraseña no cumple el formato'})
    } else if (!(email && password)){
        return response.status(400).json({error: 'El email y la contraseña son requeridos'})
    } else if (userExist){
        return response.status(400).json({error: 'El email ya existe intenta con otro'})
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);


    const newUser = new User({
        email,
        passwordHash,
    });

    await newUser.save();
    return response.sendStatus(201);

});

module.exports = usersRouter;