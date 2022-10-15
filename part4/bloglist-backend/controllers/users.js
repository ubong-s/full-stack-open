const User = require('../models/user');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

usersRouter.post('/', async (request, response) => {
   const { name, username, password } = request.body;

   if (!username || username.length < 3) {
      return response
         .status(400)
         .json({ error: 'please provide username with 3 or more chars' });
   }

   if (!password || password.length < 3) {
      return response
         .status(400)
         .json({ error: 'please provide password with 3 or more chars' });
   }

   const doesUserExist = await User.findOne({ username });

   if (doesUserExist) {
      return response.status(400).json({ error: 'username taken' });
   }

   const saltRounds = 10;
   const passwordHash = await bcrypt.hash(password, saltRounds);

   const user = new User({
      name,
      username,
      passwordHash,
   });

   const savedUser = await user.save();

   response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
   const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
   });
   response.json(users);
});

module.exports = usersRouter;
