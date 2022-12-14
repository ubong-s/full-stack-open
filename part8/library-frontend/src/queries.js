import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
   query currentUser {
      me {
         username
         favouriteGenre
      }
   }
`;

export const RECOMMENDED = gql`
   query recommended {
      me {
         username
         favouriteGenre
      }
      recommended {
         title
         published
         author {
            name
         }
      }
   }
`;

export const ALL_AUTHORS = gql`
   query Authors {
      allAuthors {
         id
         name
         born
         bookCount
      }
   }
`;

export const ALL_BOOKS = gql`
   query Books {
      allBooks {
         author {
            name
            born
         }
         id
         published
         title
         genres
      }
   }
`;

export const ALL_BOOKS_GENRE = gql`
   query AllBooksGenre($genre: String) {
      allBooks {
         author {
            name
            born
         }
         id
         published
         title
         genres
      }
      booksByGenre: allBooks(genre: $genre) {
         author {
            name
            born
         }
         id
         published
         title
         genres
      }
   }
`;

export const ADD_BOOK = gql`
   mutation addBook(
      $title: String!
      $author: String!
      $published: Int!
      $genres: [String!]!
   ) {
      addBook(
         title: $title
         author: $author
         published: $published
         genres: $genres
      ) {
         title
         published
         author {
            name
         }
      }
   }
`;

export const EDIT_AUTHOR_YEAR = gql`
   mutation editAuthorYear($name: String!, $born: Int!) {
      editAuthor(name: $name, born: $born) {
         name
         born
      }
   }
`;

export const LOGIN = gql`
   mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
         value
      }
   }
`;
