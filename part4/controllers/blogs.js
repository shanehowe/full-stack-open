const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
    response.send('Blog List backend.');
});

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({});

    response.json(blogs);
});

blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body;

    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        }
    );

    const savedBlog = await blog.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
});

blogsRouter.put('/api/blogs/:id', async (request, response) => {
    const likes = request.body.likes;
    
    // update the likes
    const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id, { likes }, { new: true}
        );
    
    response.json(updatedBlog);
})

module.exports = blogsRouter;