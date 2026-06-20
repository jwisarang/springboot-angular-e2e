import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async authenticate(email: string, password: string) {
    const response = await this.request.post('/api/auth/login', {
      data: { email, password },
    });
    const body = await response.json();
    this.token = body.accessToken;
    return body;
  }

  private authHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async get(path: string) {
    return this.request.get(path, { headers: this.authHeaders() });
  }

  async post(path: string, data: unknown) {
    return this.request.post(path, { data, headers: this.authHeaders() });
  }

  async put(path: string, data: unknown) {
    return this.request.put(path, { data, headers: this.authHeaders() });
  }

  async delete(path: string) {
    return this.request.delete(path, { headers: this.authHeaders() });
  }
}
