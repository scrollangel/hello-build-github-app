import { JWT } from "./JWT"

export interface AccountsRepository {
    signup(username: string, password: string): void
    login(username: string, password: string): JWT
}