import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { TodoPage } from "../pages/todos/TodoPage";
import { LocalStorageService } from "../storage/services/storage.service";
import { RootLayout } from "../components/layouts/RootLayout";
import { ROUTES } from "./const/routes.const";

const storage = LocalStorageService.getInstance();

// todo, 아마 loader 부분도 별도의 controller로 분리할 수 있을 것 같은데 나중에 해야겠다..
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <TodoPage />,
        loader: async () => {
          const token = storage.get("token");
          if (!token) {
            return redirect(ROUTES.LOGIN);
          }
          return null;
        },
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
            loader: async () => {
              const token = storage.get("token");
              if (token) {
                return redirect(ROUTES.TODOS);
              }
              return null;
            },
          },
          {
            path: "signup",
            element: <SignupPage />,
            loader: async () => {
              const token = storage.get("token");
              if (token) {
                return redirect(ROUTES.TODOS);
              }
              return null;
            },
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
