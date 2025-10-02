import type { Transaction, TransActionList } from "./dto";
//import type { LoginResponse } from "./dto";
import { BackService } from "../backendFetch.js";

export class TransactionService {
  static endpoint = "/transactions";
  static token = localStorage.getItem("auth_token");

  static async create(transaction: Transaction) {
    const response = await BackService.post(this.endpoint, transaction, {
    });
    if (!response.success) {
      return response.statusText;
    }
    return response;
  }

  static async update(transaction: Transaction) {
    const response = await BackService.update(`${this.endpoint}/${transaction.id}`, transaction, {
    });
    if (!response.success) {
      throw new Error(`Failed to update transaction: ${response.statusText}`);
    }
    console.log(response);
    return response;
  }

  static async delete(id: number) {
    const response = await BackService.delete(`${this.endpoint}/${id}`)

    if (!response.success) {
      console.log(response);
      throw new Error(`Failed to delete transaction: ${response.statusText}`);
    }
    console.log(response);
    return response;
  }

  static async getAll(): Promise<TransActionList> {
    return BackService.get(this.endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
