import { createBrowserRouter } from "react-router"
import ConnexionPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

export const router = createBrowserRouter([
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
        }
    ]
   }
])