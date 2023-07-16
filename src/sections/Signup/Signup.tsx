import React, { FormEvent, MouseEvent, useState } from "react";
import LocalStorageAccountsRepository from "../../infrastructure/LocalStorageAccountsRepository";
import { getInputValue } from "../../utils/getInputValue";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      LocalStorageAccountsRepository.signup(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {}
  };

  return (
    <main>
      <h1>Sign up</h1>
      <form id="signup-form" onSubmit={submitForm}>
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
    </main>
  );
}
