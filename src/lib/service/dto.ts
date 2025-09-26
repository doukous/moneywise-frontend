//export interface User {
//    id: string
//    fullname: string
//    username: string
//    email: string
//    createdAt: string
//    updatedAt: string
//}
//
//export interface RegisterRequest {
//    fullname: string
//    username: string
//    email: string
//    password: string
//}
//
//export interface LoginRequest {
//    email: string
//    password: string
//}
//
//export interface AuthResponse {
//    token: string
//    user: User
//}
//
export interface Transaction {
    id: string
    name: string
    amount: number
    category: string[]
    description?: string
    type: 'income' | 'expense'
    date: string // exemple: "2023-05-25 14:20"
}
//
//export interface Category {
//    id: string
//    name: string
//    type: 'income' | 'expense'
//}
//
//export interface Budget {
//    id: string
//    category: Category
//    amount: number
//    period: 'monthly' | 'yearly' | 'none'
//}
//
//export interface pdfReport {
//    transactions: Transaction[]
//    budget: number
//    totalIncome: number
//    totalExpense: number
//    netBalance: number
//    startDate: string
//    endDate: string
//}