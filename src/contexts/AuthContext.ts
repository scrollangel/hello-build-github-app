import { createContext } from "react";
import { JWT } from "../domain/JWT";
import { useContext } from "react";

type AuthContextType = {
  isAuth: boolean | null;
  isGithubAuth: boolean | null;
  authorize: (jwt: JWT) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
