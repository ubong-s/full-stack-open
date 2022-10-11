const blogRouter = require('express').Router();
const { query } = require('express');
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({});
   response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
   const blog = new Blog(request.body);

   const savedBlog = await blog.save();

   response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
   const { id } = request.params;

   await Blog.findByIdAndDelete(id);

   response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
   const {
      body,
      params: { id },
   } = request;

   const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
   };

   const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: query,
   });

   response.json(updatedBlog);
});

module.exports = blogRouter;
