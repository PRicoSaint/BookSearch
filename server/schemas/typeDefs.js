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
    token: String
    user: User
  }

  type Query {
    user(_id: String): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(_id: String, authors:[String], description: String, title: String!, bookId: String!, image: String, link: String): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;