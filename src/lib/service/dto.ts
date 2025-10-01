export interface User {
  id: string;
  name: string;
  email: string;
  budget: number;
  profile_image: URL;
  createdAt: string;
  updatedAt: string;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> ba2b695 (merge branches)
}

export interface PasswordResetRequestBody {
  email: string;
  password?: string;
  password_confirmation?: string;
  token?: string;
<<<<<<< HEAD
>>>>>>> ba2b695 (merge branches)
=======
>>>>>>> ba2b695 (merge branches)
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
  token_type: string;
  expires_in: number;
}

export interface Transaction {
<<<<<<< HEAD
<<<<<<< HEAD
  id?: number;
  name: string;
  user_id: number;
  amount: number;
  category: number | null;
  description?: string;
  type: string; // 'income' | 'expense'
  date: string; // exemple: "2023-05-25 14:20"
}

export interface TransActionList {
  success: boolean;
  count: number;
  transactions: Transaction[];
}

export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
=======
=======
>>>>>>> ba2b695 (merge branches)
  id: string;
  name: string;
  amount: number;
  category: string[];
  description?: string;
  type: "income" | "expense";
  date: string; // exemple: "2023-05-25 14:20"
}

export interface TransactionList {
  success: boolean;
  count: number;
  transactions: Transaction[];
<<<<<<< HEAD
>>>>>>> ba2b695 (merge branches)
=======
>>>>>>> ba2b695 (merge branches)
}
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
