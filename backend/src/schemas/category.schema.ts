import { gql } from "apollo-server-express";

// Category type definitions
export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }
`;
