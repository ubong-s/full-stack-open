require('dotenv').config();
const {
   ApolloServer,
   gql,
   UserInputError,
   AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

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

   type User {
      username: String!
      favouriteGenre: String!
      id: ID!
   }

   type Token {
      value: String!
   }

   type Mutation {
      addBook(
         title: String!
         author: String!
         published: Int!
         genres: [String!]!
      ): Book!
      editAuthor(name: String!, born: Int!): Author
      createUser(username: String!, favouriteGenre: String!): User
      login(username: String!, password: String!): Token
   }

   type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
   }
`;

const getBookCount = (bookArray = [], author) =>
   [...bookArray].filter((book) => book.author.name === author.name).length;

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

         if (books && authors) {
            const updateAuthors = [...authors].map((author) => {
               return {
                  id: author._id,
                  name: author.name,
                  born: author.born,
                  bookCount: getBookCount(books, author),
               };
            });

            return updateAuthors;
         }
      },
      me: (root, args, context) => {
         return context.currentUser;
      },
   },

   Mutation: {
      addBook: async (root, args, context) => {
         const currentUser = context.currentUser;

         if (!currentUser) {
            throw new AuthenticationError('not authenticated');
         }

         try {
            // check if books title exists already
            const bookExists = await Book.findOne({ title: args.title });

            if (bookExists) {
               throw new UserInputError('Title must be unique', {
                  invalidArgs: args.title,
               });
            }

            // Check if author already exists
            const authorExists = await Author.findOne({ name: args.author });

            if (!authorExists) {
               const newAuthor = await Author.create({ name: args.author });
               const book = await Book.create({
                  ...args,
                  author: newAuthor._id,
               });

               return book.populate('author');
            }

            const book = await Book.create({
               ...args,
               author: authorExists._id,
            });

            return book.populate('author');
         } catch (error) {
            throw new UserInputError(error.message, {
               invalidArgs: args,
            });
         }
      },

      editAuthor: async (root, args, context) => {
         const currentUser = context.currentUser;

         if (!currentUser) {
            throw new AuthenticationError('not authenticated');
         }

         try {
            const author = await Author.findOne({ name: args.name });
            if (!author) {
               throw new UserInputError('Name cannot be found', {
                  invalidArgs: args.name,
               });
            }

            author.born = args.born;

            await author.save();

            return author;
         } catch (error) {
            throw new UserInputError(error.message, {
               invalidArgs: args,
            });
         }
      },
      createUser: async (root, args) => {
         const user = new User({
            username: args.username,
            favouriteGenre: args.favouriteGenre,
         });

         return user.save().catch((error) => {
            throw new UserInputError(error.message, {
               invalidArgs: args,
            });
         });
      },
      login: async (root, args) => {
         const user = await User.findOne({ username: args.username });

         if (!user || args.password !== 'secret') {
            throw new UserInputError('Invalid credentials', {
               invalidArgs: args,
            });
         }

         const userForToken = {
            username: user.username,
            id: user._id,
         };

         return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
      },
   },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;

      if (auth && auth.toLowerCase().startsWith('bearer ')) {
         const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
         );

         const currentUser = await User.findById(decodedToken.id);

         return { currentUser };
      }
   },
});

server.listen().then(({ url }) => {
   console.log(`Server ready at ${url}`);
});
