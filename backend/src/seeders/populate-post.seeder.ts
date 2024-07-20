import { AppDataSource } from "../config/typeorm.config";
import { Post } from "../entities/Post";
import { faker } from "@faker-js/faker";

export class PopulatePostSeeder {
  public async run(): Promise<void> {
    // Get post repository
    const postRepository = AppDataSource.getRepository(Post);

    // Set the number of mock posts to be created.
    const numOfPosts = 500;

    // Keep track of the titles to make sure the posts are unique.
    const titles: string[] = [];

    let counter = 0;
    while (counter < numOfPosts) {
      // Generate post title
      const title = [faker.company.name(), faker.company.catchPhrase()].join(
        " - "
      );

      // If title already exists, skip it.
      if (titles.includes(title)) {
        continue;
      }

      // Set post data
      const orderNo = counter + 1;
      const post = postRepository.create({
        title: title,
        order: orderNo,
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
      });

      // Save to the repository
      await postRepository.save(post);

      counter++;
    }

    console.log("Successfully populate data in post table.");
  }
}
