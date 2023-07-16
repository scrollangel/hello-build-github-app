import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { AuthProvider } from "./contexts/AuthProvider";

export const GITHUB_AUTH_LOCAL_STORAGE_KEY = "github-auth";

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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
