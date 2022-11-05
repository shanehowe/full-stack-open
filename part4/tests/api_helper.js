// Helper module for testing API

const User = require('../models/user');

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

const initialUsers = [
    {
        username: 'root',
        name: 'Superuser',
        password: 'sekret'
    },
    {
        username: 'test',
        name: 'Test User',
        password: 'test'
    }
];

module.exports = {
    usersInDb,
    initialUsers,
};