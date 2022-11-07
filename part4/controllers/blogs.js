const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// For testing will remove later

blogsRouter.get('/', (request, response) => {
    response.send('Blog List backend.');
});

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 });

    response.json(blogs);
});

blogsRouter.get('/api/blogs/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
        response.json(blog);
    } else {    
        response.status(404).end();
    }
});

blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body;

    const users = await User.find({});
    const user = users[0];

    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        }
    );

    const savedBlog = await blog.save();
    
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
});

blogsRouter.put('/api/blogs/:id', async (request, response) => {
    const likes = request.body.likes;
    
    // update the likes
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true});
    
    response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;