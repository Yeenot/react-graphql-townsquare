import { AppDataSource } from "../config/typeorm.config";
import { User } from "../entities/User";
import { faker } from "@faker-js/faker";

export class PopulateUserSeeder {
  public async run(): Promise<void> {
    // Get user repository
    const userRepository = AppDataSource.getRepository(User);

    // Set the number of users to be generated
    const numOfUsers = 50;

    // Keep track of the names and emails to make sure the users are unique.
    const emails: string[] = [];
    const names: string[] = [];

    let counter = 0;
    while (counter < numOfUsers) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();

      const name = [firstName, lastName].join(" - ");

      // If name already exists, skip it and re-generate a new one.
      if (names.includes(name)) {
        continue;
      }

      // If email already exists, skip it and re-generate a new one.
      if (emails.includes(email)) {
        continue;
      }

      const user = userRepository.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        created_at: faker.date.past(), // Use random past date
        updated_at: faker.date.past(), // Use random past date
      });

      // Save user
      await userRepository.save(user);

      counter++;
    }

    console.log("Successfully populate data in user table.");
  }
}
