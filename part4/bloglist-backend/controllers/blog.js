const blogRouter = require('express').Router();
const { query } = require('express');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
   response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
   const { id } = request.params;
   const blog = await Blog.findById(id).populate('user', {
      username: 1,
      name: 1,
   });
   response.json(blog);
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

   const savedBlog = await (
      await blog.save()
   ).populate('user', { username: 1, name: 1 });
   user.blogs = user.blogs.concat(savedBlog._id);
   await user.save();

   response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
   const { id } = request.params;
   // const user = request.user;

   const blog = await Blog.findById(id);

   // if (!blog.user) {
   //    return response.status(400).json({ error: 'blog does not exist' });
   // }

   // if (user._id.toString() !== blog.user.toString()) {
   //    return response.status(401).json({ error: 'unauthorized request' });
   // }

   await blog.remove();

   response.status(204).end();
});

blogRouter.put('/:id', userExtractor, async (request, response) => {
   const {
      body,
      params: { id },
      user,
   } = request;

   const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
   };

   const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
      runValidators: true,
      context: query,
   });

   if (!updatedBlog) {
      return response.status(400).end();
   }

   user.likes = user.likes.concat(updatedBlog._id);
   await user.save();

   response.json(updatedBlog);
});

blogRouter.post('/:id/comments', async (request, response) => {
   const { text } = request.body;
   const { id } = request.params;

   let blog = await Blog.findById(id);
   blog.comments = [...blog.comments, { text }];

   await blog.save();

   response.json({ msg: 'your comment has been added' });
});

module.exports = blogRouter;
