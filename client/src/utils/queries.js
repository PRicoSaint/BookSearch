import { gql } from '@apollo/client';


export const GET_USER = gql`
  query user($_id: String) {
     user(_id:$_id) {
      _id
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