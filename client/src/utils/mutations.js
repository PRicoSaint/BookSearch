import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
            user {
              _id
                username
                }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($_id: String!,$authors: [String], $title: String!, $bookId: String!, $description: String, $image: String, $link: String) {
    saveBook(_id: $_id, authors: $authors, title: $title, bookId: $bookId, description: $description, image: $image, link: $link) {
      _id
      # authors
      # title
      # description
      # bookId
      # image
      # link
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($_id: String!, $bookId: String!) {
    removeBook(_id: $_id, bookId: $bookId) {
      _id
      username
      savedBooks{
                bookId
                authors
                description
                title
                image
            }
    }
  }
`;