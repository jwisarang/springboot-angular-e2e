import { test, expect } from '../../fixtures';

test.describe('Authentication', () => {
  test('successful login navigates to dashboard', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );
    await expect(page).toHaveURL(/dashboard/);
  });

  test('invalid credentials shows error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('empty form submission shows validation errors', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.submitButton.click();
    await expect(loginPage.emailInput).toBeFocused();
  });
});
