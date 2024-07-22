import { IPost } from "../entities/Post";
import PubsubSingleton from "../shared/pubsub-singleton";

export const SUBSCRIPTION_POST_ORDER_UPDATED = "POST_ORDER_UPDATED";

/**
 * Post Subscription Class - This class is responsible for sending notifications to the clients
 * that there are some changes related to the post and they might need it to update the page's state.
 */
export class PostSubscription {
  // Notify client that there are changes to the order position of the posts.
  notifyNewPostOrder(post: IPost) {
    PubsubSingleton.getInstance().publish(SUBSCRIPTION_POST_ORDER_UPDATED, {
      newPostOrder: post,
    });
  }
}
