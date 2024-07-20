import { gql } from "apollo-server";
import { postTypeDefs } from "./post.schema";

export const typeDefs = gql`
  # Set to empty since we are segregating type definitions
  type Query {
    _empty: String
  }

  # Set to empty since we are segregating type definitions
  type Mutation {
    _empty: String
  }

  # Merge all type definitions
  ${postTypeDefs}
`;
