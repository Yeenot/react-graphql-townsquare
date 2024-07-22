import { gql } from "apollo-server-express";

// User type definitions
export const userTypeDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
  }
`;
