const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 });

    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
        response.json(blog);
    } else {    
        response.status(404).end();
    }
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = request.user;

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        }
    );

    let savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    savedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 });

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        return response.status(404).json({
            error: 'blog does not exist'
        });
    } else if (!user) {
        return response.status(401).json({
            error: 'unathorized request'
        });
    }
    
    // Check to make sure it is user who posted blog trying to delete
    if (blog.user._id.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'blogs can only be deleted by publisher' });
    }

    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const blog = request.body;

    const user = await User.findById(blog.user);

    if (!user) {
        return response.status(401).json({ error: 'only users are permitted to do this action' });
    }
    
    // update the likes
    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true})
        .populate('user', { username: 1, name: 1 });
    
    response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;