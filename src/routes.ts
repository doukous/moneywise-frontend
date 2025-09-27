import { createBrowserRouter } from "react-router"
import ConnexionPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import { TransactionPage } from "./pages/transactionPage"
import NotFoundPage from "./pages/404"
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage"

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
    },
   {
    path: 'auth',

    children: [
        {
            path: 'login',
            Component: ConnexionPage,
        },
        {
            path: 'register',
            Component: RegisterPage,
        },
        {
            path: 'password_reset',
            Component: ForgottenPasswordPage,
        }
    ]
   },
   {
    path: '/transactions',
    Component: TransactionPage,
   },
   {
    path: '/*',
    Component: NotFoundPage,
   }
])