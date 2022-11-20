require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('../models/author');
const Book = require('../models/book');
const { authors } = require('./authors');
const { books } = require('./books');

const seed = async () => {
   mongoose.connect(process.env.MONGO_URI);

   console.log('Seeding Started');
   try {
      // await Book.insertMany(books);
      // await Author.insertMany(authors);

      console.log('Seeding Complete');
      mongoose.disconnect();
   } catch (error) {
      console.log('Error seeding', error.message);
   }
};

seed();
