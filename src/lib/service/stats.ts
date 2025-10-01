import { BackService } from "../backendFetch.js";
import type { CategoryStatsResponse, MonthlyStatsResponse, SummaryStatsResponse } from "./dto";

export class StatsService {
  static async getCategoryStats(): Promise<CategoryStatsResponse> {
    return BackService.get("/stats/categories");
  }

  static async getMonthlyStats(): Promise<MonthlyStatsResponse> {
    return BackService.get("/stats/monthly");
  }

  static async getSummary(): Promise<SummaryStatsResponse> {
    return BackService.get("/stats/summary");
  }
}