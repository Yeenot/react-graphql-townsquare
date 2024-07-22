import { postResolvers } from "./post.resolver";

// Merge all resolvers into one
export const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};
