export interface User {
    id: string
    name: string
    username: string
    email: string
    createdAt: string
}

export interface AuthResponse {
    session: unknown
    user: User
}

export interface Transaction {
    id: string
    amount: number
    date: string
    category: string
    description?: string
    type: 'income' | 'expense'
}

export interface Category {
    id: string
    name: string
    type: 'income' | 'expense'
    createdAt: string
    updatedAt: string
}

export interface Budget {
    id: string
    category: Category
    amount: number
    period: 'monthly' | 'yearly'
    createdAt: string
    updatedAt: string
}

export interface Report {
    totalIncome: number
    totalExpense: number
    netSavings: number
    expensesByCategory: { [category: string]: number }
}

