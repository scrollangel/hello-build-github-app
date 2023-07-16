import React from "react";
import "./App.css";
import { Signup } from "./sections/Signup/Signup";
import { Login } from "./sections/Login/Login";
import { useAuth } from "./contexts/AuthContext";
import { GithubApplication } from "./sections/Repositories/GithubApplication";

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
      {isAuth && <GithubApplication />}
    </>
  );
}

export default App;
