import React, { FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import LocalStorageAccountsRepository from "../../infrastructure/LocalStorageAccountsRepository";
import { getInputValue } from "../../utils/getInputValue";
import { useAuth } from "../../contexts/AuthContext";
import "../../index.css";
import { useNavigate } from "react-router";

export function Login() {
  const {isAuth} = useAuth();
  const navigate = useNavigate();

  const { authorize } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) navigate("/my-repositories")
  }, [isAuth])

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const jwt = LocalStorageAccountsRepository.login(username, password);
      authorize(jwt);

      setUsername("");
      setPassword("");
      navigate("/my-repositories")
    } catch (error) {}
  };

  return (
    <main className="centered-box full-screen">
      <section className="form-wrapper">
        <header>
          <h1>Login</h1>
          <p>Please log in to access your account.</p>
        </header>
        <form id="login-form" className="form" onSubmit={submitForm}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={getInputValue(setUsername)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={getInputValue(setPassword)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <footer>
          Don't have an account? <a href="/sign-up">Sign up here</a>
        </footer>
      </section>
    </main>
  );
}
