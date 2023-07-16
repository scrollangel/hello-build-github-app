import { GithubAccount } from "../domain/GithubAccount";

const GITHUB_AUTHORIZATION_URI = "https://github.com/login/oauth/access_token";
const CLIENT_ID = "910fae4891801c5180ea"

class ApiGithubAccount implements GithubAccount {
  async authorize(code: string): Promise<any> {
    const query = new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: "57d7ccc53b7fe9b36a8c7d911b58ba22d91446ad",
    })
    const response = await fetch(`${GITHUB_AUTHORIZATION_URI}?${query}`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    })

    return response.json();
  }
}

export default new ApiGithubAccount();
