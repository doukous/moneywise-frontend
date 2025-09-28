import type { Transaction } from "./dto.js";

export class TransactionService {
  static endpoint =
    "https://moneywise-api-backend.onrender.com/api/transactions";

  static async create(transaction: Transaction) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error(`Failed to create transaction: ${response.statusText}`);
    }
    return response.json();
  }
}
