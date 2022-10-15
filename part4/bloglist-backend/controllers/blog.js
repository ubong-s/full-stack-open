const blogRouter = require('express').Router();
const { query } = require('express');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
   response.json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response) => {
   const { body, user } = request;

   const blog = new Blog({
      ...body,
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id,
   });

   const savedBlog = await blog.save();
   user.blogs = user.blogs.concat(savedBlog._id);
   await user.save();

   response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
   const { id } = request.params;
   const user = request.user;

   const blog = await Blog.findById(id);

   if (!blog.user) {
      return response.status(400).json({ error: 'blog does not exist' });
   }

   if (user._id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: 'unauthorized request' });
   }

   await blog.remove();

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
