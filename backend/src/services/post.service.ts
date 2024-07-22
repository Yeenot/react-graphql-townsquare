import { Repository } from "typeorm";
import { AppDataSource } from "../config/typeorm.config";
import { Post } from "../entities/Post";
import { PostSubscription } from "../subscriptions/post.subscription";

/**
 * Post Service Class - This class is responsible for handling the business logic related
 * to the posts. The purpose of this is to segregate the business logic from the graphql resolvers layer.
 * In this case, whenever we change the structure of the graphql resolvers layer, it will not affect the
 * core functionalities of the applciation.
 */
export class PostService {
  repository: Repository<Post>;
  subscription: PostSubscription;

  constructor() {
    // Initialize post repository and subscription
    this.repository = AppDataSource.getRepository(Post);
    this.subscription = new PostSubscription();
  }

  // Get lists of posts according the specified criteria.
  getPosts(options: { limit?: number; offset?: number }) {
    const limit = options?.limit ?? 10;
    const offset = options?.offset ?? 0;

    return this.repository.find({
      relations: ["user", "category"], // Include the user/author and the category it belongs
      take: limit,
      skip: offset,
      order: {
        order: "ASC",
      },
    });
  }

  // This will update the post's order index/position
  async updatePostOrder(id: number, newPositionIndex: number) {
    const post = await this.repository.findOneBy({ id: id });

    // If there is no post, throw an error.
    if (!post) {
      throw new Error("Unable to find post.");
    }

    const currentIndex = post?.order;
    // If the current position is the same with the new one then return it immediately.
    if (currentIndex === newPositionIndex) {
      return post;
    }

    // Create query builder for updating the post
    let query = this.repository.createQueryBuilder().update(Post);

    /**
     * If a post is moved to a lower position then increase the position by 1 to all of posts
     * below it up until to the new position.
     */
    if (newPositionIndex > currentIndex) {
      query
        .set({
          order: () => `order - 1`,
        })
        .where("order > :currentIndex", { currentIndex })
        .andWhere("order <= :newPositionIndex", { newPositionIndex });
    } else {
      /**
       * But, if a post is moved to a higher position then decrease the position by 1 to all of posts
       * above it up until to the new position.
       */
      query
        .set({
          order: () => `order + 1`,
        })
        .where("order < :currentIndex", { currentIndex })
        .andWhere("order >= :newPositionIndex", { newPositionIndex });
    }

    // Execute the query to update the positions accordingly.
    await query.execute();

    post.order = newPositionIndex; // Set the new position of the post and save it.
    await post.save();

    // Notify the clients that there was a change in the order position of the posts.
    this.subscription.notifyNewPostOrder(post);

    return post;
  }
}
