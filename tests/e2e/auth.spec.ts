import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should log in successfully', async ({ page }) => {
    // Navigate to your frontend app that uses @oabta/allauth
    await page.goto('http://localhost:3000/login');

    // Fill in credentials
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'testpassword');
    
    // Submit
    await page.click('button[type="submit"]');

    // Assert redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
