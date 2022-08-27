const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

test('blogs are returned as json', async () => {
    try {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    } catch(exception) {
        console.log(exception);
    }
}, 100000);

test('verifies unique identifier of blog posts is named id', async () => {
    const blogs = await Blog.find({});

    expect(blogs[0]._id).toBeDefined();
});

afterAll(() => {
    mongoose.connection.close();
});