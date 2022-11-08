// Helper module for testing API
const Blog = require('../models/blog');
const User = require('../models/user');

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}
const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

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
    blogsInDb
};