import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>this is todo page</>,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  // todo: add error boundary component
  // todo: add not found page
]);

export const Router = () => <RouterProvider router={router} />;
