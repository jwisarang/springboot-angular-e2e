import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';

test.describe('Spring Boot API — Health & Auth', () => {
  test('actuator health endpoint returns UP', async ({ request }) => {
    const response = await request.get('/actuator/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('UP');
  });

  test('authenticated API call succeeds with valid credentials', async ({ request }) => {
    const client = new ApiClient(request);
    await client.authenticate(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );
    const response = await client.get('/api/users/me');
    expect(response.status()).toBe(200);
  });

  test('unauthenticated API call returns 401', async ({ request }) => {
    const response = await request.get('/api/users/me');
    expect(response.status()).toBe(401);
  });
});
