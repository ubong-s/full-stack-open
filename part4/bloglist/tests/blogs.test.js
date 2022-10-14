const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./blogs_helper');

const api = supertest(app);

beforeEach(async () => {
   await Blog.deleteMany({});
   await Blog.insertMany(helper.initialBlogs);
});

describe('fetching blogs', () => {
   test('blogs are returned as JSON and correct length returned', async () => {
      const response = await api.get('/api/blogs');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toContain('application/json');
      expect(response.body).toHaveLength(helper.initialBlogs.length);
   }, 10000);

   test('id to be defined instead of "_id"', async () => {
      const response = await api.get('/api/blogs');

      response.body.map((blog) => {
         expect(blog._id).not.toBeDefined();
         expect(blog.id).toBeDefined();
      });
   });
});

describe('creating a new blog', () => {
   let token;
   beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('secretPass', 10);

      const user = await new User({
         name: 'Ubong',
         username: 'ubsly',
         passwordHash,
      }).save();

      token = helper.getToken({ id: user.id, user: user.name });
   });

   test('verifies that making an HTTP post successfully creates a new blog + checks new length', async () => {
      const newBlog = {
         title: 'Jest Testing through RTL',
         author: 'Matt IIves',
         url: 'https://fullstackopen.com/',
         likes: 20,
      };

      const blogsAtStart = await helper.blogsInDb();

      await api
         .post('/api/blogs')
         .set('Authorization', `Bearer ${token}`)
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);

      expect(titles).toContain('Jest Testing through RTL');
   });

   test('verifies that default likes is 0 when not provided', async () => {
      const newBlog = {
         title: 'Jest Testing through RTL',
         author: 'Matt IIves',
         url: 'https://fullstackopen.com/',
      };

      await api
         .post('/api/blogs')
         .set('Authorization', `Bearer ${token}`)
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      const blogToView = blogsAtEnd[blogsAtEnd.length - 1];

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      expect(blogToView.likes).toBe(0);
   });

   test('verifies that backend responds with status of 400 if title/url is missing', async () => {
      const newBlog = {
         author: 'Matt IIves',
      };

      await api
         .post('/api/blogs')
         .set('Authorization', `Bearer ${token}`)
         .send(newBlog)
         .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
   });
});

describe('delete blog', () => {
   let token;
   beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('secretPass', 10);

      const user = await new User({
         name: 'Ubong',
         username: 'ubsly',
         passwordHash,
      }).save();

      token = helper.getToken({ id: user.id, user: user.name });

      const newBlog = {
         title: 'Blog to be deleted',
         author: 'Matt IIves',
         url: 'blog-to-be-deleted',
         user: user.id,
      };

      await api
         .post('/api/blogs')
         .set('Authorization', `Bearer ${token}`)
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/);
   });

   test('deleting a blog succeeds', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

      await api
         .delete(`/api/blogs/${blogToDelete.id}`)
         .set('Authorization', `Bearer ${token}`)
         .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);

      expect(titles).not.toContain(blogToDelete.title);
   });

   test('deleting a blog fails if user did not create the blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
         .delete(`/api/blogs/${blogToDelete.id}`)
         .set('Authorization', `Bearer ${token}`)
         .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

      const titles = blogsAtEnd.map((b) => b.title);

      expect(titles).toContain(blogToDelete.title);
   });
});

describe('updating blog', () => {
   test('updating a blog content', async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToUpdate = blogsAtStart[0];

      const blogObject = {
         title: 'uboho is trying 2',
         author: 'uboho',
         url: 'uboho-is-trying-2',
      };

      await api
         .put(`/api/blogs/${blogToUpdate.id}`)
         .send(blogObject)
         .expect(200)
         .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd[0];

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      expect(updatedBlog).toEqual({
         ...blogToUpdate,
         title: 'uboho is trying 2',
         author: 'uboho',
         url: 'uboho-is-trying-2',
      });
   });

   test('updating amount of likes on a blog', async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToUpdate = blogsAtStart[0];

      const blogObject = {
         likes: blogToUpdate.likes + 1,
      };

      await api
         .put(`/api/blogs/${blogToUpdate.id}`)
         .send(blogObject)
         .expect(200)
         .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd[0];

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
   });
});

afterAll(() => {
   mongoose.connection.close();
});
