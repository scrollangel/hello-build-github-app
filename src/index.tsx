import React from "react";
import ReactDOM from "react-dom/client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./contexts/AuthProvider";

import { client } from "./config/client";
import { App } from "./App";

export const GITHUB_AUTH_LOCAL_STORAGE_KEY = "github-auth";

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
