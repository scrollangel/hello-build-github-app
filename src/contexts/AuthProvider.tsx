import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { JWT } from "../domain/JWT";
import jwt_decode from "jwt-decode";
import { AuthData } from "../domain/AuthData";
import { GITHUB_AUTH_LOCAL_STORAGE_KEY } from "..";
import { FAVORITES_LOCAL_STORAGE_KEY } from "../sections/Repositories/utils";

const AUTH_LOCAL_STORAGE_KEY = "auth";

type Props = {
  children?: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isJWTLoaded, setIsJWTLoaded] = useState(false);

  const [JWT, setJWT] = useState<AuthData | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isGithubAuth, setIsGithubAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const localAuth = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    const jwt = localAuth ? JSON.parse(localAuth) : null;
    setIsJWTLoaded(true);
    setJWT(jwt);
  }, []);
  useEffect(() => {
    const localGithubAuth = localStorage.getItem(GITHUB_AUTH_LOCAL_STORAGE_KEY);
    setIsGithubAuth(!!localGithubAuth);
  }, []);
  useEffect(() => {
    if (isJWTLoaded) authorize();
  }, [JWT, isJWTLoaded]);

  const authorize = () => {
    if (!JWT) {
      setIsAuth(false);
      return;
    }

    const expDate = new Date(JWT.exp);
    const now = new Date();

    if (now > expDate) {
      setIsAuth(false);
      setJWT(null);
      return;
    }

    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(JWT));
    setIsAuth(true);
  };

  const login = (jwt: JWT) => {
    const decodedJWT = jwt_decode(jwt.authToken) as AuthData;
    setJWT(decodedJWT);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    localStorage.removeItem(GITHUB_AUTH_LOCAL_STORAGE_KEY);
    localStorage.removeItem(FAVORITES_LOCAL_STORAGE_KEY);

    setIsAuth(false);
    setIsGithubAuth(false);
    setJWT(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, isGithubAuth, authorize: login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
