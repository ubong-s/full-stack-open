const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./users_helper');

const api = supertest(app);

describe('Creating a new user', () => {
   beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('secretPass', 10);

      const user = new User({
         name: 'Ubong',
         username: 'ubsly',
         passwordHash,
      });

      await user.save();
   });

   test('returns error when no username is provided', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
         password: 'amaxxx',
      };

      const response = await api.post('/api/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.text).toContain(
         'please provide username with 3 or more chars'
      );

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toEqual(usersAtStart);
      expect(usersAtStart).toHaveLength(usersAtEnd.length);
   });

   test('returns error when username is less then 3 charcters', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
         usernam: 'ab',
         password: 'amaxxx',
      };

      const response = await api.post('/api/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.text).toContain(
         'please provide username with 3 or more chars'
      );

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toEqual(usersAtStart);
      expect(usersAtStart).toHaveLength(usersAtEnd.length);
   });

   test('returns error when username is taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
         username: 'ubsly',
         password: 'secrest',
      };

      const response = await api.post('/api/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.text).toContain('username taken');

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toEqual(usersAtStart);
      expect(usersAtStart).toHaveLength(usersAtEnd.length);
   });

   test('returns error when no password is provided', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
         username: 'ublam',
         password: '',
      };

      const response = await api.post('/api/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.text).toContain(
         'please provide password with 3 or more chars'
      );

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toEqual(usersAtStart);
      expect(usersAtStart).toHaveLength(usersAtEnd.length);
   });

   test('returns error when password length is less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
         username: 'ublam',
         password: 'se',
      };

      const response = await api.post('/api/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.text).toContain(
         'please provide password with 3 or more chars'
      );

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtStart).toHaveLength(usersAtEnd.length);
   });

   test('creates new user if all fields are provided', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
         username: 'ubongy',
         password: 'cretsee',
      };

      const response = await api.post('/api/users').send(newUser);

      expect(response.status).toBe(201);

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).not.toEqual(usersAtStart);
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
   });
});
