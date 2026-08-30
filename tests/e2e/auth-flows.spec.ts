import { test, expect } from '@playwright/test';

// Run tests in order to handle empty backend state
test.describe.configure({ mode: 'serial' });

const TEST_USER = {
  username: 'e2e_test_user',
  email: 'e2e_test@example.com',
  password: 'Password123!',
};

test.describe('Full Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Assumption: A test app using @oabta/allauth is running on localhost:3000
    await page.goto('http://localhost:3000');
  });

  test('Signup', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[name="username"]', TEST_USER.username);
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    
    // Assert redirect or success message
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('Logout', async ({ page }) => {
    await page.click('button#logout');
    await expect(page).toHaveURL('/login');
  });

  test('Login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USER.username);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('Password Reset', async ({ page }) => {
    await page.goto('/password/reset');
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
