import { IPost } from "../entities/Post";
import { PostService } from "../services/post.service";
import { SUBSCRIPTION_POST_ORDER_UPDATED } from "../subscriptions/post.subscription";

import PubsubSingleton from "../shared/pubsub-singleton";

/**
 * Resolvers for posts. Instead of putting the business logic directly here, I decided to segregate them into
 * services. This is to create a boundary between the business logics and the graphql functions.
 */
export const postResolvers = {
  Query: {
    // Get list of posts by pagination
    posts: (_: undefined, { limit = 10, offset = 0 }): Promise<IPost[]> => {
      const postService = new PostService();
      return postService.getPosts({ limit, offset });
    },
  },
  Mutation: {
    // Update post's order position
    updatePostOrder: async (
      _: undefined,
      params: { id: number; newPositionIndex: number }
    ) => {
      const { id, newPositionIndex } = params;

      const postService = new PostService();
      return postService.updatePostOrder(id, newPositionIndex);
    },
  },
  Subscription: {
    newPostOrder: {
      subscribe: () =>
        PubsubSingleton.getInstance().asyncIterator([
          SUBSCRIPTION_POST_ORDER_UPDATED,
        ]),
    },
  },
};
