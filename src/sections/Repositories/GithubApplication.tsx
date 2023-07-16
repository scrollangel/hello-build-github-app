import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ApiGithubAccount from "../../infrastructure/ApiGithubAccount";
import { GITHUB_AUTH_LOCAL_STORAGE_KEY, client } from "../..";
import { GithubRepositories } from "./GithubRepositories";

const GITHUB_CLIENT_ID = "910fae4891801c5180ea";

export function GithubApplication() {
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

      console.log("#code", code, response.access_token, response)

      client.resetStore();
      window.location.href = "/";
    } catch (error) {}
  }

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + GITHUB_CLIENT_ID
    );
  }

  function handleLogout() {
    logout();
    client.clearStore();
  }

  if (isGithubAuth === null) {
    return <></>;
  }

  return (
    <>
      {isGithubAuth && <GithubRepositories />}
      {!isGithubAuth && (
        <>
          <button onClick={loginWithGithub}>Login with github</button>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
