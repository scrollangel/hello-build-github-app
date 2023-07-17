import { AccountsRepository } from "../domain/AccountsRepository";
import { JWT } from "../domain/JWT";
import { User } from "../domain/User";
import sign from "jwt-encode";

export const fakeJWT: JWT = {
  authToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R0ZXN0dGVzdCIsImlhdCI6MTY4OTUyMzQ3NSwiZXhwIjoxNjkwMTI4NTM5fQ.1r1cJtYxzzbgzcR-4g8QLhyOmW5XbLZ8n3LxyOAaXS4",
};

class LocalStorageAccountsRepository implements AccountsRepository {
  #localStorageUsersKey = "users";
  #jwtSecretKey = "hellobuild";

  signUp(username: string, password: string): void {
    if (!username || !password) {
      throw "Both username and password should be provided";
    }

    const localUsers = localStorage.getItem(this.#localStorageUsersKey);
    const users = (localUsers ? JSON.parse(localUsers) : []) as Array<User>;
    const usernameExists = users.some(u => u.username === username);

    if (usernameExists) {
      throw "Username already exists";
    }

    const user = { username, password };

    users.push(user);

    localStorage.setItem(this.#localStorageUsersKey, JSON.stringify(users));
  }

  login(username: string, password: string): JWT {
    const localUsers = localStorage.getItem(this.#localStorageUsersKey);
    const users = (localUsers ? JSON.parse(localUsers) : []) as Array<User>;
    const searchedUser = users.find((u) => u.username === username);

    if (!searchedUser) {
      throw "The user does not exist!";
    }

    const correctCredentials = searchedUser.password === password;

    if (!correctCredentials) {
      throw "The password is wrong!";
    }

    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const tokenData = {
      username, 
      iat: now.getTime(),
      exp: nextMonth.getTime(),
    }

    const token = sign(tokenData, this.#jwtSecretKey);

    return { authToken: token };
  }
}

export default new LocalStorageAccountsRepository();
