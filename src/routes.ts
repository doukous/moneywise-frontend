import { createBrowserRouter, redirect } from "react-router";
import { BackService } from "./lib/backendFetch";
import { TransactionPage } from "./pages/transactionPage";
import ConnexionPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/404";
import Profile from "./pages/profile";
import Reports from "./pages/Reports";
import StatisticsPage from "./pages/StatisticsPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  TransactionList,
} from "./lib/service/dto";

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

async function dashboardDataLoader() {
  const token = localStorage.getItem("auth_token");
  const user = await BackService.get("/api/me", {
    headers: { authorization: `Bearer ${token}` },
  });

  const transactions: TransactionList = await BackService.get(
    "/api/transactions",
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return { user: user, transactions: transactions };
}

export const router = createBrowserRouter([
  {
    path: "/",
    middleware: [authMiddleware],
    children: [
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
        action: async ({ request }) => {
          const data = await request.formData();

          const requestBody: LoginRequest = {
            email: data.get("mail-address")!.toString(),
            password: data.get("password")!.toString(),
          };

          const response: LoginResponse = await BackService.post(
            "/api/login",
            requestBody
          );

          if (response.access_token) {
            localStorage.setItem("auth_token", response.access_token);
            localStorage.setItem(
              "auth_token_creation_time",
              Date.now().toString()
            );
            return redirect("/");
          }

          return { response: JSON.stringify(response) };
        },
      },
      {
        path: "register",
        Component: RegisterPage,
        action: async ({ request }) => {
          const data = await request.formData();

          const requestBody: RegisterRequest = {
            name: data.get("fullname")!.toString(),
            email: data.get("mail-address")!.toString(),
            password: data.get("password")!.toString(),
          };

          const response = await BackService.post("/api/register", requestBody);
          if (response) return redirect("/login");

          return { response: JSON.stringify(response) };
        },
      },
      {
        path: "password_reset",
        Component: ForgottenPasswordPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
