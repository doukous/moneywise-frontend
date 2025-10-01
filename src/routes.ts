import { createBrowserRouter, redirect } from "react-router";
<<<<<<< HEAD
<<<<<<< HEAD
import ConnexionPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { TransactionPage } from "./pages/transactionPage";
import NotFoundPage from "./pages/404";

import Profile from "./pages/profile";

import { BackService } from "./lib/backendFetch";

import Reports from "./pages/Reports";
import StatisticsPage from "./pages/StatisticsPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  TransActionList,
  Category,
} from "./lib/service/dto";
=======
import { TransactionPage } from "./pages/transactionPage";
import ConnexionPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/404";
import Profile from "./pages/profile";
import Reports from "./pages/Reports";
import StatisticsPage from "./pages/StatisticsPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
=======
import { TransactionPage } from "./pages/transactionPage";
import ConnexionPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/404";
import Profile from "./pages/profile";
import Reports from "./pages/Reports";
import StatisticsPage from "./pages/StatisticsPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
>>>>>>> ba2b695 (merge branches)
import { dashboardDataLoader } from "./lib/loaders";
import {
  forgottenPasswordAction,
  loginAction,
  registerAction,
} from "./lib/actions";
<<<<<<< HEAD
>>>>>>> ba2b695 (merge branches)
=======
>>>>>>> ba2b695 (merge branches)

function authMiddleware() {
  const token = localStorage.getItem("auth_token");
  if (!token) throw redirect("/auth/login");

  const dateActuel = Date.now();
  const dateToken = Number(localStorage.getItem("auth_token_creation_time"));
  if (dateActuel - dateToken > 3600000) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_creation_time");
    throw redirect("/auth/login");
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
async function dashboardDataLoader() {
  const token = localStorage.getItem("auth_token");
  const user = await BackService.get("/me", {
    headers: { authorization: `Bearer ${token}` },
  });

  const categories: Category[] = await BackService.get("/categories", {
    headers: { authorization: `Bearer ${token}` },
  });

  const transactions: TransActionList = await BackService.get("/transactions", {
    headers: { authorization: `Bearer ${token}` },
  });

  return { user: user, transactions: transactions, categories: categories };
}

=======
>>>>>>> ba2b695 (merge branches)
=======
>>>>>>> ba2b695 (merge branches)
export const router = createBrowserRouter([
  {
    path: "/",
    middleware: [authMiddleware],
    children: [
      {
        path: "login",
        Component: ConnexionPage,
      },
      {
        path: "",
        loader: dashboardDataLoader,
        Component: HomePage,
      },
      {
        path: "statistiques",
        Component: StatisticsPage,
      },
      {
        path: "transactions",
        loader: dashboardDataLoader,
        Component: TransactionPage,
      },
      {
        path: "/profile",
        Component: Profile,
      },

      {
        path: "/reports",
        Component: Reports,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        Component: ConnexionPage,
<<<<<<< HEAD
<<<<<<< HEAD
        action: async ({ request }) => {
          const data = await request.formData();

          const requestBody: LoginRequest = {
            email: data.get("mail-address")!.toString(),
            password: data.get("password")!.toString(),
          };

          const response: LoginResponse = await BackService.post(
            "/login",
            requestBody,
          );

          console.log(response);

          if (response.access_token) {
            localStorage.setItem("auth_token", response.access_token);
            localStorage.setItem(
              "auth_token_creation_time",
              Date.now().toString(),
            );
            return redirect("/");
          }

          return { response: JSON.stringify(response) };
        },
=======
        action: loginAction,
>>>>>>> ba2b695 (merge branches)
=======
        action: loginAction,
>>>>>>> ba2b695 (merge branches)
      },
      {
        path: "register",
        Component: RegisterPage,
<<<<<<< HEAD
<<<<<<< HEAD
        action: async ({ request }) => {
          const data = await request.formData();

          const requestBody: RegisterRequest = {
            name: data.get("fullname")!.toString(),
            email: data.get("mail-address")!.toString(),
            password: data.get("password")!.toString(),
          };

          const response = await BackService.post("/register", requestBody);
          if (response) return redirect("/login");

          return { response: JSON.stringify(response) };
        },
=======
        action: registerAction,
>>>>>>> ba2b695 (merge branches)
=======
        action: registerAction,
>>>>>>> ba2b695 (merge branches)
      },
      {
        path: "password_reset",
        Component: ForgottenPasswordPage,
        action: forgottenPasswordAction,
      },
    ],
  },
  {
    path: "/transactions",
    Component: TransactionPage,
  },
  {
    path: "/profil",
    Component: Profile,
  },
  {
    path: "/*",
    Component: NotFoundPage,
  },
]);
