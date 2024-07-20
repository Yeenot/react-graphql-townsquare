import { ApolloServer } from "apollo-server";
import { AppDataSource } from "./config/typeorm.config";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import "reflect-metadata";

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
AppDataSource.initialize()
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch((error) => console.log(error));
