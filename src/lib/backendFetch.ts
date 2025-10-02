export class BackService {
  static baseUrl = `https://moneywise-api-backend.onrender.com/api`;
  static token = localStorage.getItem("auth_token");

  static async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (response.status === 204) {
      return null; // No content to return
    }

    return response.json();
  }

  static async get(endpoint: string, options: RequestInit = {}) {
    return await this.fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...(options.headers || {}),
      },
      method: "GET",
    });
  }

  static async post<T>(endpoint: string, body: T, options: RequestInit = {}) {
    return await this.fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...(options.headers || {}),
      },
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  static async update<T>(endpoint: string, body: T, options: RequestInit = {}) {
    return BackService.fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...(options.headers || {}),
      },
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  static async delete(endpoint: string, options: RequestInit = {}) {
    return BackService.fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...(options.headers || {}),
      },

      ...options,
      method: "DELETE",
    });
  }
}
