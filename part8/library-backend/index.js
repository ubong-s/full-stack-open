require('dotenv').config();
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

console.log('Connecting to MongoDB');

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log('Connected to MongoDB');
   })
   .catch((error) => {
      console.log('Eror connecting to MongoDB', error.message);
   });

const typeDefs = gql`
   type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String!]!
   }

   type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
   }

   type Mutation {
      addBook(
         title: String!
         author: String!
         published: Int!
         genres: [String!]!
      ): Book!
      editAuthor(name: String!, born: Int!): Author
   }

   type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
   }
`;

const resolvers = {
   Query: {
      bookCount: async () => await Book.collection.countDocuments(),
      authorCount: () => async () => await Author.collection.countDocuments(),
      allBooks: async (root, args) => {
         const author = await Author.findOne({ name: args.author });
         if (args.author && args.genre) {
            return Book.find({
               author: author._id,
               genres: { $in: args.genre },
            }).populate('author');
         }

         if (args.author) {
            return Book.find({
               author: author._id,
            }).populate('author');
         }

         if (args.genre) {
            return Book.find({
               genres: { $in: args.genre },
            }).populate('author');
         }

         return Book.find({}).populate('author');
      },

      allAuthors: async () => {
         const books = await Book.find({}).populate('author');
         let authors = await Author.find({});

         const getBookCount = (author) =>
            [...books].filter((book) => book.author.name === author.name)
               .length;

         if (books && authors) {
            const updateAuthors = [...authors].map((author) => {
               return {
                  id: author._id,
                  name: author.name,
                  born: author.born,
                  bookCount: getBookCount(author),
               };
            });

            return updateAuthors;
         }
      },
   },

   Mutation: {
      addBook: async (root, args) => {
         // check if books title exists already
         const bookExists = await Book.findOne({ title: args.title });
         console.log(bookExists);
         if (bookExists) {
            throw new UserInputError('Title must be unique', {
               invalidArgs: args.title,
            });
         }

         // Check if author already exists
         const authorExists = await Author.findOne({ name: args.author });

         if (!authorExists) {
            const newAuthor = await Author.create({ name: args.author });
            const book = await Book.create({ ...args, author: newAuthor._id });

            return book.populate('author');
         }

         const book = await Book.create({ ...args, author: authorExists._id });

         return book.populate('author');
      },

      editAuthor: async (root, args) => {
         const author = await Author.findOne({ name: args.name });
         if (!author) {
            throw new UserInputError('Name cannot be found', {
               invalidArgs: args.name,
            });
         }

         author.born = args.born;
         author.save();

         return author;
      },
   },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

server.listen().then(({ url }) => {
   console.log(`Server ready at ${url}`);
});
