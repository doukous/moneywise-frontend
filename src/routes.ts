import { createBrowserRouter, redirect } from "react-router"
import ConnexionPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import { TransactionPage } from "./pages/transactionPage"
import NotFoundPage from "./pages/404"
import ForgottenPasswordPage from "./pages/PasswordResetPage"
import type { LoginRequest, RegisterRequest } from "./lib/service/dto"
import { BackService } from "./lib/backendFetch"


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
            action: async ({ request }) => {
                const data = await request.formData()
                const loginData : LoginRequest = {
                    'email': data.get('mail-address')!.toString(),
                    'password': data.get('password')!.toString()
                }

                // const response = await BackService.post<LoginRequest>('/api/login', loginData)
                // redirect("/")
            } 
        },
        {
            path: 'register',
            Component: RegisterPage,
            action: async ({ request }) => {
                const data = await request.formData()
                const registeringData : RegisterRequest = {
                    'name': data.get('fullname')!.toString(),
                    'email': data.get('mail-address')!.toString(),
                    'password': data.get('password')!.toString()
                }

                // const response = await BackService.post<RegisterRequest>('/api/register', registeringData)
                // redirect("/")
            }
        },
        {
            path: 'reset-password',
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