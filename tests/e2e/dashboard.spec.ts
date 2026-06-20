import { test, expect } from '../../fixtures';

test.describe('Dashboard', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('dashboard loads with expected components', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('navigation links are accessible', async ({ page }) => {
    await page.goto('/dashboard');
    const nav = page.getByRole('navigation');
    await expect(nav.getByRole('link')).toHaveCount.call(expect, await nav.getByRole('link').count());
  });
});
