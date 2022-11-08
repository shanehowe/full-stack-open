const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const api = supertest(app);

const { initialBlogs } = require('./blog_helper');

// TODO: refactor tests so that blogs have a user
beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
}, 10000);

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

    }, 10000);

    test('verifies unique identifier of blog posts is named _id', async () => {
        const blogs = await Blog.find({});

        expect(blogs[0]._id).toBeDefined();
    });
});

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToView = blogsAtStart[0];

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

        expect(resultBlog.body).toEqual(processedBlogToView);
    });

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445';

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400);
    });
});


describe('when certain properties are missing', () => {
    let token = null;

    beforeEach(async () => {
        await User.deleteMany({});
        
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'chubs', passwordHash });
        await user.save();

        const userForToken = { username: user.username, id: user._id };
        token = jwt.sign(userForToken, process.env.SECRET);
    });

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const blog = {
            title: 'Shanes blog with missing likes',
            author: 'Shane',
            url: 'www.shane.com'
        };
        

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
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
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(400);
    });

    test('backend response with 401 if token is missing', async () => {
        await api
            .post('/api/blogs')
            .send({
                title: 'blog with no token',
                author: 'the tokenless author',
                url: "www.whereismytoken.com"
            })
            .expect(401);
    });
});

describe('when deleting a blog', () => {
    let token = null;

    beforeEach(async () => {
        await User.deleteMany({});
        
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'chubs', passwordHash });
        await user.save();

        const userForToken = { username: user.username, id: user._id };
        token = jwt.sign(userForToken, process.env.SECRET);
    });

    test('succeeds with code 204 id is valid & is the creater deleting', async () => {
        const testBlog = {
            title: 'test blog',
            author: 'test author',
            url: 'www.test.com',
            likes: 1
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(testBlog);

        const blogs = await Blog.find({});
        const blogToDelete = blogs.find(b => b.title === 'test blog');

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204);

        const blogsAfterDelete = await Blog.find({});

        expect(blogsAfterDelete.length).toBe(blogs.length - 1);
    }, 10000);

    test('fails with code 404 if blog does not exist', async () => {
        const nonExistingId = '5a3d5da59070081a82a3445';

        const result = await api
            .delete(`api/blogs/${nonExistingId}`)
            .set('Authorization', `bearer ${token}`)
            .expect(404)

        expect(result.body.error).toContain('blog does not exist');
    })
});

describe('when adding a blog', () => {
    let token = null;

    beforeEach(async () => {
        await User.deleteMany({});
        
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'chubs', passwordHash });
        await user.save();

        const userForToken = { username: user.username, id: user._id };
        token = jwt.sign(userForToken, process.env.SECRET);
    });

    test('backend responds with 201 if all properties are defined', async () => {
        const beforeTestingBlogs = await Blog.find({});

        const blog = {
            title: 'a great blog',
            author: 'some guy',
            url: 'www.someguyswebsite.com',
            likes: 1
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog);

        const newBlogs = await Blog.find({});

        expect(newBlogs.length - beforeTestingBlogs.length).toBe(1);
    }, 100000);
});

describe('when updating a blog', () => {
    let token = null;

    beforeEach(async () => {
        await User.deleteMany({});
        
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'chubs', passwordHash });
        await user.save();

        const userForToken = { username: user.username, id: user._id };
        token = jwt.sign(userForToken, process.env.SECRET);
    });

    test('succeeds with status code 200 if id is valid', async () => {

        const testBlog = {
            title: 'test blog',
            author: 'test author',
            url: 'www.test.com',
            likes: 1
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
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
});

afterAll(() => {
    mongoose.connection.close();
});