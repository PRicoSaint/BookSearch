const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # input SavedBooks {
  #   authors: [String]
  #   description: String
  #   bookId: String
  #   image: String
  #   link: String
  #   title: String
  # }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors:[String], description: String, title: String!, bookId: String!, image: String, link: String): Book
    removeBook(bookId: String!): Book
  }
`;

module.exports = typeDefs;