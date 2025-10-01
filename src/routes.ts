import { createBrowserRouter, redirect } from "react-router";
import { TransactionPage } from "./pages/transactionPage";
import ConnexionPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/404";
import Profile from "./pages/profile";
import Reports from "./pages/Reports";
import StatisticsPage from "./pages/StatisticsPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import { dashboardDataLoader } from "./lib/loaders";
import {
  forgottenPasswordAction,
  loginAction,
  registerAction,
} from "./lib/actions";

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

export const router = createBrowserRouter([
  {
    path: "/",
    middleware: [authMiddleware],
    children: [
      {
        index: true,
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
        action: loginAction
      },
      {
        path: "register",
        Component: RegisterPage,
        action: registerAction
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
