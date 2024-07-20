import { postResolvers } from "./post.resolvers";

export const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
};
