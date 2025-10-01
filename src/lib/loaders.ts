import { BackService } from "./backendFetch";
import type { TransactionList } from "./service/dto";

export async function dashboardDataLoader() {
  const token = localStorage.getItem("auth_token");
  const user = await BackService.get("/api/me", {
    headers: { authorization: `Bearer ${token}` },
  });

  const transactions: TransactionList = await BackService.get(
    "/api/transactions",
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return { user: user.user, transactions: transactions };
}
