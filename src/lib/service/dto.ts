export interface User {
  id: string | number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  budget?: number;
  profile_image?: string | URL | null;
  mobileNumber?: string;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PasswordResetRequestBody {
  email: string;
  password?: string;
  password_confirmation?: string;
  token?: string;
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
  id: number | null;
  // name or description may be used
  title: string | null;
  amount: number;
  // category can be number id, string name, array or null depending on API
  category_name: string;
  category: Category;
  description: string;
  type: "income" | "expense";
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
}

export interface Budget {
  id: string;
  category: Category;
  amount: number;
  period: "monthly" | "yearly" | "none";
}

export interface pdfReport {
  transactions: Transaction[];
  budget: number;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  startDate: string;
  endDate: string;
}

export interface CategoryStats {
  [categoryName: string]: { income: number; expense: number };
}

export interface MonthlyStats {
  [month: string]: { income: number; expense: number };
}

export interface SummaryStats {
  total_income: number;
  total_expense: number;
  balance: number;
  budget: number;
}

export interface CategoryStatsResponse {
  success: boolean;
  stats_by_category: CategoryStats;
}

export interface MonthlyStatsResponse {
  success: boolean;
  stats_by_month: MonthlyStats;
}

export interface SummaryStatsResponse {
  success: boolean;
  summary: SummaryStats;
}
