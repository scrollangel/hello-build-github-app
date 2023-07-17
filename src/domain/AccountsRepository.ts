import { JWT } from "./JWT"

export interface AccountsRepository {
    signUp(username: string, password: string): void
    login(username: string, password: string): JWT
}