import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit) {
      id
      title
      category {
        id
        name
      }
      user {
        id
        first_name
        last_name
        email
      }
      created_at
    }
  }
`;
