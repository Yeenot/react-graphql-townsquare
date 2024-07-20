import { AppDataSource } from "../config/typeorm.config";
import { Post } from "../entities/Post";

export const postResolvers = {
  Query: {
    // Get list of posts
    getPosts: async () => {
      const postRepository = AppDataSource.getRepository(Post);
      return postRepository.find();
    },
  },
};
