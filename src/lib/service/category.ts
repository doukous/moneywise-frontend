import type { Category } from "./dto";
import { BackService } from "../backendFetch.js";

export class CategoryService {
  static endpoint = "/categories";
  static token = localStorage.getItem("auth_token");

  static async getAll(): Promise<Category[]> {
    return BackService.get(this.endpoint, {
        headers: {
            Authorization: `Bearer ${this.token}`,
        }
    });
  }
}