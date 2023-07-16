import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { gql } from "@apollo/client";
import ApiGithubAccount from "../../infrastructure/ApiGithubAccount";
import { GITHUB_AUTH_LOCAL_STORAGE_KEY } from "../..";

const GITHUB_CLIENT_ID = "910fae4891801c5180ea";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export function GithubRepositories() {
  const { isGithubAuth, logout } = useAuth();

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const code = urlParams.get("code");
    const localGithubAuth = localStorage.getItem(GITHUB_AUTH_LOCAL_STORAGE_KEY);

    if (code && !localGithubAuth) {
      getAuthorization(code);
    }
  }, []);

  async function getAuthorization(code: string) {
    try {
      const response = await ApiGithubAccount.authorize(code);

      if (response.error) {
        window.location.href = "/";
        return;
      }

      localStorage.setItem(
        GITHUB_AUTH_LOCAL_STORAGE_KEY,
        response.access_token
      );
      window.location.href = "/";
    } catch (error) {}
  }

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + GITHUB_CLIENT_ID
    );
  }

  if (isGithubAuth === null) {
    return <></>;
  }

  return (
    <>
      {isGithubAuth && <></>}
      {!isGithubAuth && (
        <>
          <button onClick={loginWithGithub}>Login with github</button>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </>
  );
}
