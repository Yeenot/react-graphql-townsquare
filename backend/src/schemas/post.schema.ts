import { gql } from "apollo-server";

// Post's type definitions
export const postTypeDefs = gql`
  extend type Post {
    id: Int
    title: String
    order: Int
    created_at: String
    updated_at: String
  }

  extend type Query {
    getPosts: [Post]
  }

  extend type Mutation {
    movePost(id, positionIndex: number): void
  }
`;
