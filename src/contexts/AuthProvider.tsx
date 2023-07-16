import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { JWT } from "../domain/JWT";
import jwt_decode from "jwt-decode";
import { AuthData } from "../domain/AuthData";

const AUTH_LOCAL_STORAGE_KEY = "auth";

type Props = {
  children?: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [JWT, setJWT] = useState<AuthData | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const localAuth = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    const jwt = localAuth ? JSON.parse(localAuth) : null;
    setJWT(jwt);
  }, []);
  useEffect(() => {
    authorize();
  }, [JWT]);

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
  } 

  const logout = () => {
    setIsAuth(false);
    setJWT(null);
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuth, authorize: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
