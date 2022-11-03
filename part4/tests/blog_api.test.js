const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 5
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

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
    const beforeTestingBlogs = await Blog.find({});

    const blog = {
        title: 'a great blog',
        author: 'some guy',
        url: 'www.someguyswebsite.com',
        likes: 1
    };

    await api
        .post('/api/blogs')
        .send(blog);
    
    const newBlogs = await Blog.find({});

    expect(newBlogs.length - beforeTestingBlogs.length).toBe(1);
}, 100000);

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const blog = {
        title: 'Shanes blog with missing likes',
        author: 'Shane',
        url: 'www.shane.com'
    };

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201);

    const blogs = await Blog.find({});

    const blogToCheck = blogs.find(b => b.title === 'Shanes blog with missing likes');

    expect(blogToCheck.likes).toBe(0);
});

test('backend responds with status 400 when making request with missing url and title', async () => {
    const blog = {
        title: '',
        author: 'JP Howe',
        url: ''
    };

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);
});

test('blog is successfully deleted', async () => {
    const testBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'www.test.com',
        likes: 1
    };

    await api
        .post('/api/blogs')
        .send(testBlog);
    
    const blogs = await Blog.find({});
    const blogToDelete = blogs.find(b => b.title === 'test blog');

    await api
        .delete(`/api/blogs/${blogToDelete._id}`)
    
    const blogsAfterDelete = await Blog.find({});

    expect(blogsAfterDelete.length).toBe(blogs.length - 1);
}, 100000);

test('blog is successfully updated', async () => {
    const testBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'www.test.com',
        likes: 1
    };

    await api
        .post('/api/blogs')
        .send(testBlog);
    
    const blogs = await Blog.find({});
    const blogToUpdate = blogs.find(b => b.title === 'test blog');
    
    const updatedBlog = {
        id: blogToUpdate._id,
        likes: 2
    };

    await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(updatedBlog)
        .expect(200);
    
    const blogsAfterUpdate = await Blog.find({});
    const updatedBlogAfterUpdate = blogsAfterUpdate.find(b => b.title === 'test blog');

    expect(updatedBlogAfterUpdate.likes).toBe(blogToUpdate.likes + 1);

}, 100000);

afterAll(() => {
    mongoose.connection.close();
});