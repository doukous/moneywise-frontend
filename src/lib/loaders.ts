import { BackService } from "./backendFetch";
import type { TransActionList } from "./service/dto";

export async function dashboardDataLoader() {
  const token = localStorage.getItem("auth_token");
  const user = await BackService.get("/me", {
    headers: { authorization: `Bearer ${token}` },
  });

  const transactions: TransActionList = await BackService.get(
    "/transactions",
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  const categories = await BackService.get("/categories", {
    headers: { authorization: `Bearer ${token}` },
  });
  console.log({transactions, categories});
  return { user: user.user, transactions: transactions, categories: categories.categories };
}


export async function logout() {
  const token = localStorage.getItem("auth_token");
  console.log(token)
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token_creation_time");
  window.location.href = '/auth/login'
}
