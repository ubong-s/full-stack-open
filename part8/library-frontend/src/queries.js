import { gql } from '@apollo/client';

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
         author
         id
         published
         title
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
         author
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
