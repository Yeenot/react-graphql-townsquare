import { AppDataSource } from "../config/typeorm.config";
import { Category } from "../entities/Category";
import { faker } from "@faker-js/faker";

export class PopulateCategorySeeder {
  public async run(): Promise<void> {
    // Get category repository
    const categoryRepository = AppDataSource.getRepository(Category);

    // List of categories
    const categories: string[] = [
      "Sports",
      "Ecommerce",
      "Business",
      "Education",
      "Competition",
      "Finance",
      "Science",
      "Entertainment",
    ];

    // Create database records for the categories
    for (const name of categories) {
      const category = categoryRepository.create({
        name: name,
        created_at: faker.date.past(), // Use random past date
        updated_at: faker.date.past(), // Use random past date
      });

      // Save category
      await categoryRepository.save(category);
    }

    console.log("Successfully populate data in category table.");
  }
}
