import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloLink } from "@apollo/react-hooks";
import { GITHUB_AUTH_LOCAL_STORAGE_KEY } from "..";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
  credentials: "include",
  headers: {
    Authorization: "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",
  },
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GITHUB_AUTH_LOCAL_STORAGE_KEY);

  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
