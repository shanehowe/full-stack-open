const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

test('blogs are returned as json', async () => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

}, 100000);

test('verifies unique identifier of blog posts is named _id', async () => {
    const blogs = await Blog.find({});

    expect(blogs[0]._id).toBeDefined();
});

test('making a post request to /api/blogs is successful', async () => {
    const initialBlogs = await Blog.find({});

    const blog = {

        title: 'test blog 2',
        author: 'test author 2',
        url: 'www.awesomeblog.com',
        likes: 1
    };

    await api
        .post('/api/blogs')
        .send(blog);
    
    const newBlogs = await Blog.find({});

    expect(newBlogs.length - initialBlogs.length).toBe(1);
}, 100000);

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const blog = {
        title: 'Shanes blog with no likes',
        author: 'Chubs The Great',
        url: 'www.shane.com'
    };

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201);

    const blogs = await Blog.find({});

    const blogToCheck = blogs.find(b => b.title === 'Shanes blog with no likes');

    expect(blogToCheck.likes).toBe(0);
});

test('backend responds with status 400 when making request with missing url and title', async () => {
    const blog = {
        title: '',
        author: "JP Howe",
        url: ''
    };

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);
})
afterAll(() => {
    mongoose.connection.close();
});