import type { Transaction } from "./dto";
//import type { LoginResponse } from "./dto";
import { BackService } from "../backendFetch.js";

export class TransactionService {
  static endpoint = "/transactions";
  static token = localStorage.getItem("auth_token");

  static async create(transaction: Transaction) {
    const response = await BackService.post(this.endpoint, transaction, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      return response.statusText;
    }
    return response.json();
  }

  static async update(transaction: Transaction) {
    const response = await fetch(`${this.endpoint}/${transaction.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error(`Failed to update transaction: ${response.statusText}`);
    }
    return response.json();
  }

  static async delete(id: number) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete transaction: ${response.statusText}`);
    }
    return response.json();
  }
}
