import { gql } from "apollo-server-express";

import { userTypeDefs } from "./user.schema";
import { categoryTypeDefs } from "./category.schema";
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

  # Set to empty since we are segregating type definitions
  type Subscription {
    _empty: String
  }

  # Merge all type definitions
  ${userTypeDefs}
  ${categoryTypeDefs}
  ${postTypeDefs}
`;
