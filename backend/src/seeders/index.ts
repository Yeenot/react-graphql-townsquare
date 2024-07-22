import { AppDataSource } from "../config/typeorm.config";
import { PopulateCategorySeeder } from "./populate-category.seeder";
import { PopulatePostSeeder } from "./populate-post.seeder";
import { PopulateUserSeeder } from "./populate-user.seeder";

export class MainSeeder {
  public async run(): Promise<void> {
    // Specify the seeders you want to be executed and run `npm run seeder:run` command.

    // Populate unique/random data to the database
    await new PopulateUserSeeder().run();
    await new PopulateCategorySeeder().run();
    await new PopulatePostSeeder().run();
  }
}

// Initialize connection when running seeder
AppDataSource.initialize()
  .then(async () => {
    await new MainSeeder().run();
    AppDataSource.destroy();
  })
  .catch((error) => console.log(error));
