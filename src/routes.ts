import { createBrowserRouter } from "react-router"
import ConnexionPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/404"

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
        }
    ]
   },
   {
    path: '/*',
    Component: NotFoundPage,
   }
])