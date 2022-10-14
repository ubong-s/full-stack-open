const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const { query } = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
   response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
   const { body, token } = request;

   const decodedToken = jwt.verify(token, process.env.SECRET);

   if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
   }

   const user = await User.findById(decodedToken.id);

   const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
   });

   const savedBlog = await blog.save();
   user.blogs = user.blogs.concat(savedBlog._id);
   await user.save();

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
