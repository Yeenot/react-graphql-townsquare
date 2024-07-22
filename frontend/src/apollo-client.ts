import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost";
const API_PORT = process.env.REACT_APP_API_PORT || 4000;
const SUBSCRIPTION_URL =
  process.env.REACT_APP_SUBSCRIPTION_URL || "ws://localhost";
const SUBSCRIPTION_PORT = process.env.REACT_APP_SUBSCRIPTION_PORT || 4000;

// Set query link
const httpLink = new HttpLink({
  uri: `${API_URL}:${API_PORT}/graphql`,
});

// Set websocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${SUBSCRIPTION_URL}:${SUBSCRIPTION_PORT}/graphql`,
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
