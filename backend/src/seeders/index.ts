import { AppDataSource } from "../config/typeorm.config";
import { PopulatePostSeeder } from "./populate-post.seeder";

export class MainSeeder {
  public async run(): Promise<void> {
    // Specify the seeders you want to be executed and run `npm run seeder:run` command.
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
