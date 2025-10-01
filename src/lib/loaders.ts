import { BackService } from "./backendFetch";
import type { TransactionList } from "./service/dto";

export async function dashboardDataLoader() {
  const token = localStorage.getItem("auth_token");
  const user = await BackService.get("/me", {
    headers: { authorization: `Bearer ${token}` },
  });

  const transactions: TransactionList = await BackService.get(
    "/transactions",
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return { user: user.user, transactions: transactions };
}

export async function logout() {
  const token = localStorage.getItem("auth_token");
  console.log(token)
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token_creation_time");
  window.location.href = '/auth/login'
}
