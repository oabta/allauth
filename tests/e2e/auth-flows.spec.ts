import { test, expect } from '@playwright/test';

// Run tests in order to handle empty backend state
test.describe.configure({ mode: 'serial' });

const VALID_USER = {
  username: 'test_user_1',
  email: 'test1@example.com',
  password: 'Password123!',
};

const INVALID_PASSWORD = 'WrongPassword!';

test.describe('Full Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('Signup - Success', async ({ page }) => {
    await page.goto('http://localhost:5173/#/signup');
    await page.fill('#username', VALID_USER.username);
    await page.fill('#email', VALID_USER.email);
    await page.fill('#password', VALID_USER.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('Signup - Error (Duplicate)', async ({ page }) => {
    await page.goto('http://localhost:5173/signup');
    await page.fill('input[name="username"]', VALID_USER.username);
    await page.fill('input[name="email"]', VALID_USER.email);
    await page.fill('input[name="password"]', VALID_USER.password);
    await page.click('button[type="submit"]');
    
    // Expect error handling (e.g., alert or error message)
    await expect(page.locator('body')).toContainText(/error/i);
  });

  test('Login - Error (Invalid Password)', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="username"]', VALID_USER.username);
    await page.fill('input[name="password"]', INVALID_PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page.locator('body')).toContainText(/error/i);
  });

  test('Login - Success', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="username"]', VALID_USER.username);
    await page.fill('input[name="password"]', VALID_USER.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('Logout', async ({ page }) => {
    await page.click('button#logout');
    await expect(page).toHaveURL('/login');
  });

  test('Password Reset - Request', async ({ page }) => {
    await page.goto('http://localhost:5173/password/request');
    await page.fill('input[name="email"]', VALID_USER.email);
    await page.click('button[type="submit"]');
    
    await expect(page.locator('body')).toContainText(/success/i);
  });

  test('Email Verification - Error (Invalid Key)', async ({ page }) => {
    await page.goto('http://localhost:5173/verify-email');
    await page.fill('input[name="key"]', 'invalid-key');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('body')).toContainText(/error/i);
  });
});
