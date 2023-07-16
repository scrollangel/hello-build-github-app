export interface GithubAccount {
  authorize(code: string): Promise<any>;
}
