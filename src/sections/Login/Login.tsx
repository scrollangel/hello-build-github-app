import React, { FormEvent, MouseEvent, useContext, useState } from "react";
import LocalStorageAccountsRepository from "../../infrastructure/LocalStorageAccountsRepository";
import { getInputValue } from "../../utils/getInputValue";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
  const { authorize } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const jwt = LocalStorageAccountsRepository.login(username, password);
      authorize(jwt);

      setUsername("");
      setPassword("");
    } catch (error) {}
  };

  return (
    <section>
      <h1>Login</h1>
      <form id="login-form" onSubmit={submitForm}>
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
    </section>
  );
}
