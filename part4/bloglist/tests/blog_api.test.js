const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./blog_api_helper');

const api = supertest(app);

beforeEach(async () => {
   await Blog.deleteMany({});
   await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as JSON and correct length returned', async () => {
   const response = await api.get('/api/blogs');

   expect(response.status).toBe(200);
   expect(response.header['content-type']).toContain('application/json');
   expect(response.body).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
   mongoose.connection.close();
});
