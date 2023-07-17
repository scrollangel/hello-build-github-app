import { createBrowserRouter } from "react-router-dom";
import { Login } from "../sections/Login/Login";
import { GithubApplication } from "../sections/Repositories/GithubApplication";
import { SignUp } from "../sections/Signup/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/my-repositories",
    element: <GithubApplication />,
  },
]);
