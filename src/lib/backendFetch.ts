export class BackService {
  static baseUrl = `https://moneywise-api-backend.onrender.com/api`;

  static async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
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

  static get(endpoint: string, options: RequestInit = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: "GET",
    });
  }

  static post<T>(endpoint: string, body: T, options: RequestInit = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  static async update<T>(endpoint: string, body: T, options: RequestInit = {}) {
    return BackService.fetch(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  static async delete(endpoint: string, options: RequestInit = {}) {
    return BackService.fetch(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}
