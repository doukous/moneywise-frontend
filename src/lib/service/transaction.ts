import type { Transaction } from "./dto.js";
import { BackService } from "../backendFetch.js";

export class TransactionService {
    static endpoint = '/transactions';

    static getAll(): Promise<Transaction[]> {
        return BackService.get(this.endpoint);
    }

    static getById(id: string): Promise<Transaction> {
        return BackService.get(`${this.endpoint}/${id}`);
    }

    static create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
        return BackService.post(`${this.endpoint}/create`, transaction);
    }

    static update(id: string, transaction: Partial<Omit<Transaction, 'id'>>): Promise<Transaction> {
        return BackService.update(`${this.endpoint}/${id}`, transaction);
    }

    static delete(id: string): Promise<void> {
        return BackService.delete(`${this.endpoint}/${id}`);
    }

    static filterByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
        return BackService.get(`${this.endpoint}?startDate=${startDate}&endDate=${endDate}`);
    }

    static filterByCategory(category: string, data: Transaction[]): Promise<Transaction[]> {
        return Promise.resolve(data.filter(transaction => transaction.category.includes(category)));
    }
}