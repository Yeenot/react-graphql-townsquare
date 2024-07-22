import { gql } from "apollo-server-express";

// Post type definitions
export const postTypeDefs = gql`
  type Post {
    id: Int
    title: String
    order: Int
    user: User!
    category: Category!
    created_at: String
    updated_at: String
  }

  extend type Query {
    posts(offset: Int, limit: Int): [Post]!
  }

  extend type Mutation {
    updatePostOrder(id: Int!, newPositionIndex: Int!): Post
  }

  extend type Subscription {
    newPostOrder: Post
  }
`;
