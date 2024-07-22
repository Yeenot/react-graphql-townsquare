import express from "express";
import http from "http";
import { config } from "dotenv";

import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import {
  makeExecutableSchema,
  type IExecutableSchemaDefinition,
} from "@graphql-tools/schema";

import { AppDataSource } from "./config/typeorm.config";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

config();

const APP_PORT = process.env.APP_PORT || 4000;

// Setting up apollo server
async function startApolloServer(
  typeDefs: IExecutableSchemaDefinition["typeDefs"],
  resolvers: IExecutableSchemaDefinition["resolvers"]
) {
  const app = express();
  const httpServer = http.createServer(app);

  // Instantiate websocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Initialize the data source
  await AppDataSource.initialize();

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServerCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: APP_PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${APP_PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
