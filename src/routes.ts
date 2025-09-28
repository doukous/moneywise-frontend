import { createBrowserRouter } from "react-router"
import ConnexionPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import { TransactionPage } from "./pages/transactionPage"
import NotFoundPage from "./pages/404"

import Profile from "./pages/profile";
import Reports from "./pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        Component: ConnexionPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
  {
    path: "/transactions",
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

  {
    path: "/*",
    Component: NotFoundPage,
  },
]);
