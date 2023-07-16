import React from "react";
import "./App.css";
import { Signup } from "./sections/Signup/Signup";
import { Login } from "./sections/Login/Login";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuth, logout } = useAuth();

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
      {isAuth && <button onClick={logout}>Logout</button>}
    </>
  );
}

export default App;
