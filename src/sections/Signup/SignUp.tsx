import React, { FormEvent, MouseEvent, useEffect, useState } from "react";
import LocalStorageAccountsRepository from "../../infrastructure/LocalStorageAccountsRepository";
import { getInputValue } from "../../utils/getInputValue";
import { redirect, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export function SignUp() {
  const {isAuth} = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) navigate("/my-repositories")
  }, [isAuth])

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      LocalStorageAccountsRepository.signUp(username, password);
      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      if (typeof error === "string") setError(error);
      else setError("We will work to fix it!");
    }
  };

  return (
    <main className="centered-box full-screen">
      <section className="form-wrapper">
        <header>
          <h1>Sign up</h1>
          <p>Fill out the form below to create your account.</p>
          {error && (
            <article className="form-error">
              <h5>It looks like something is wrong</h5>
              {error}
            </article>
          )}
        </header>
        <form id="signup-form" className="form" onSubmit={submitForm}>
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

          <button type="submit">Sign up</button>
        </form>
        <footer>
          Already have an account? <a href="/login">Log in here</a>
        </footer>
      </section>
    </main>
  );
}
