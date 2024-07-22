import { AppDataSource } from "../config/typeorm.config";
import { Post } from "../entities/Post";
import { faker } from "@faker-js/faker";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { generateRandomNumber } from "../utils/generate-random-number.utils";

export class PopulatePostSeeder {
  public async run(): Promise<void> {
    // Get user, category, and post repository
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);
    const postRepository = AppDataSource.getRepository(Post);

    // Get all users and categories
    const users = await userRepository.find();
    const categories = await categoryRepository.find();

    // Set the number of posts to be generated
    const numOfPosts = 500;

    // Keep track of the titles to make sure the posts are unique.
    const titles: string[] = [];

    let counter = 0;
    while (counter < numOfPosts) {
      // Generate title of the post for high chance of uniqueness
      const title = [
        faker.commerce.product(),
        faker.company.name(),
        faker.commerce.productDescription(),
      ].join(" - ");

      // If title already exists, skip it and re-generate new one.
      if (titles.includes(title)) {
        continue;
      }

      /**
       * Let's assign each post randomly to a user and category by generating random indexes
       * between the number of users and categories, inclusively.
       */
      const userRandomIndex = generateRandomNumber(0, users.length - 1);
      const categoryRandomIndex = generateRandomNumber(
        0,
        categories.length - 1
      );

      // Get the actual user and category data from the generated random index.
      const user = users[userRandomIndex];
      const category = categories[categoryRandomIndex];

      // Set post data
      const orderNo = counter + 1;
      const post = postRepository.create({
        title: title,
        order: orderNo,
        user: user,
        category: category,
        created_at: faker.date.past(), // Use random past date
        updated_at: faker.date.past(), // Use random past date
      });

      // Save post
      await postRepository.save(post);

      counter++;
    }

    console.log("Successfully populate data in post table.");
  }
}
