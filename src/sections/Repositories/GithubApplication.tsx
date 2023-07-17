import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ApiGithubAccount from "../../infrastructure/ApiGithubAccount";
import { GITHUB_AUTH_LOCAL_STORAGE_KEY } from "../..";
import { GithubRepositories } from "./GithubRepositories";
import { client } from "../../config/client";

import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import { FavoritesRepositories } from "./FavoritesRepositories";
import classNames from "classnames";
import { useNavigate } from "react-router";
import { Repository } from "../../domain/Repository";
import {
  getFavoritesFromLocalStorage,
  setFavoritesToLocalStorage,
} from "./utils";

const GITHUB_CLIENT_ID = "910fae4891801c5180ea";

export function GithubApplication() {
  const { isAuth, isGithubAuth, logout } = useAuth();
  const navigate = useNavigate();

  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Array<Repository>>([]);

  useEffect(() => {
    const favorites = getFavoritesFromLocalStorage();
    setFavorites(favorites);
  }, []);
  useEffect(() => {
    if (isAuth !== null && !isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const code = urlParams.get("code");
    const localGithubAuth = localStorage.getItem(GITHUB_AUTH_LOCAL_STORAGE_KEY);

    if (code && !localGithubAuth) {
      getAuthorization(code);
    }
  }, []);

  const updateFavorites = (favorites: Array<Repository>) => {
    setFavorites(favorites);
    setFavoritesToLocalStorage(favorites);
  };

  const addToFavorites = (repository: Repository) => {
    const favorites = getFavoritesFromLocalStorage();

    updateFavorites([...favorites, repository]);
  };
  const removeFromFavorites = (repository: Repository) => {
    const favorites = getFavoritesFromLocalStorage();

    updateFavorites(favorites.filter((rep) => rep.id !== repository.id));
  };

  const toggleFavorites = (repository: Repository) => {
    const isFavorite = favorites.some((r) => r.id === repository.id);

    if (isFavorite) removeFromFavorites(repository);

    if (!isFavorite) addToFavorites(repository);
  };
  function toggleShowFavorites() {
    setShowFavorites(!showFavorites);
  }

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
    navigate("/");
    client.clearStore();
  }

  if (isGithubAuth === null) {
    return <></>;
  }

  return (
    <>
      <header id="top-bar">
        <h1>HelloBuild</h1>
        <button
          className={classNames("icon-button", { floating: showFavorites })}
          onClick={handleLogout}
          title="Log out"
        >
          <LogoutIcon />
        </button>
        <button
          className={classNames("icon-button", { floating: showFavorites })}
          onClick={toggleShowFavorites}
          title="Show favorites"
        >
          <StarIcon />
        </button>
      </header>
      <main className="content">
        {!isGithubAuth && (
          <>
            <p>To view your repositories, please sign up with GitHub.</p>
            <button onClick={loginWithGithub} className="github-button">
              Login with Github
            </button>
          </>
        )}
        {isGithubAuth && (
          <>
            <GithubRepositories
              favorites={favorites}
              toggleFavorites={toggleFavorites}
            />
          </>
        )}
        <FavoritesRepositories
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
          isOpen={showFavorites}
        />
      </main>
    </>
  );
}
