import React from "react";
import "./App.css";
import { Signup } from "./sections/Signup/Signup";
import { Login } from "./sections/Login/Login";
import { useAuth } from "./contexts/AuthContext";
import { GithubRepositories } from "./sections/Repositories/GithubRepositories";

function App() {
  const { isAuth } = useAuth();

  if (isAuth === null) {
    return <></>;
  }

  return (
    <>
      {!isAuth && (
        <>
          <Signup />
          <Login />
        </>
      )}
      {isAuth && <GithubRepositories />}
    </>
  );
}

export default App;
