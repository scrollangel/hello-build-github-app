import React from "react";
import { RouterProvider, Routes } from "react-router";
import { router } from "./config/router";
import { Route, Navigate, BrowserRouter } from "react-router-dom";
import { Login } from "./sections/Login/Login";
import { SignUp } from "./sections/Signup/SignUp";
import { GithubApplication } from "./sections/Repositories/GithubApplication";
import { useAuth } from "./contexts/AuthContext";

export function App() {
  const {isAuth} = useAuth();

  if (isAuth === null) {
    return <></>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? "/my-repositories" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-repositories" element={<GithubApplication />} />
      </Routes>
    </BrowserRouter>
  );
}
