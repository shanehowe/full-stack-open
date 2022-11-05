const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/api/users', async (request, response) => {
    const users = await User.find({});

    response.status(200).json(users);
});

usersRouter.post('/api/users', async (request, response) => {
    const { username, name, password } = request.body;

    // TODO: validate username and password
    // Both username and password must be at least 3 characters long
    // username must be unique
    if (!username || !password) {
        return response.status(400).json({
            error: 'username and password must be provided'
        });
    }
    
    if (password.length < 3 || username.length < 3) {
        return response.status(400).json({ 
            error: 'password and username must be at least 3 characters long' 
        });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return response.status(400).json({ 
            error: 'username must be unique' 
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = usersRouter;