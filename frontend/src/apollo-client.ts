import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const SUBSCRIPTION_URL =
  process.env.REACT_APP_SUBSCRIPTION_URL || "ws://localhost:4000";

// Set query link
const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

// Set websocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${SUBSCRIPTION_URL}/graphql`,
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
