# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/e2e/auth-flows.spec.ts >> Full Authentication Flow >> Signup - Success
- Location: tests/e2e/auth-flows.spec.ts:19:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#username')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Run tests in order to handle empty backend state
  4  | test.describe.configure({ mode: 'serial' });
  5  | 
  6  | const VALID_USER = {
  7  |   username: 'test_user_1',
  8  |   email: 'test1@example.com',
  9  |   password: 'Password123!',
  10 | };
  11 | 
  12 | const INVALID_PASSWORD = 'WrongPassword!';
  13 | 
  14 | test.describe('Full Authentication Flow', () => {
  15 |   test.beforeEach(async ({ page }) => {
  16 |     await page.goto('http://localhost:5173/');
  17 |   });
  18 | 
  19 |   test('Signup - Success', async ({ page }) => {
  20 |     await page.goto('http://localhost:5173/#/signup');
> 21 |     await page.fill('#username', VALID_USER.username);
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  22 |     await page.fill('#email', VALID_USER.email);
  23 |     await page.fill('#password', VALID_USER.password);
  24 |     await page.click('button[type="submit"]');
  25 |     
  26 |     await expect(page).toHaveURL(/.*\/dashboard/);
  27 |   });
  28 | 
  29 |   test('Signup - Error (Duplicate)', async ({ page }) => {
  30 |     await page.goto('http://localhost:5173/signup');
  31 |     await page.fill('input[name="username"]', VALID_USER.username);
  32 |     await page.fill('input[name="email"]', VALID_USER.email);
  33 |     await page.fill('input[name="password"]', VALID_USER.password);
  34 |     await page.click('button[type="submit"]');
  35 |     
  36 |     // Expect error handling (e.g., alert or error message)
  37 |     await expect(page.locator('body')).toContainText(/error/i);
  38 |   });
  39 | 
  40 |   test('Login - Error (Invalid Password)', async ({ page }) => {
  41 |     await page.goto('http://localhost:5173/login');
  42 |     await page.fill('input[name="username"]', VALID_USER.username);
  43 |     await page.fill('input[name="password"]', INVALID_PASSWORD);
  44 |     await page.click('button[type="submit"]');
  45 | 
  46 |     await expect(page.locator('body')).toContainText(/error/i);
  47 |   });
  48 | 
  49 |   test('Login - Success', async ({ page }) => {
  50 |     await page.goto('http://localhost:5173/login');
  51 |     await page.fill('input[name="username"]', VALID_USER.username);
  52 |     await page.fill('input[name="password"]', VALID_USER.password);
  53 |     await page.click('button[type="submit"]');
  54 | 
  55 |     await expect(page).toHaveURL(/.*\/dashboard/);
  56 |   });
  57 | 
  58 |   test('Logout', async ({ page }) => {
  59 |     await page.click('button#logout');
  60 |     await expect(page).toHaveURL('/login');
  61 |   });
  62 | 
  63 |   test('Password Reset - Request', async ({ page }) => {
  64 |     await page.goto('http://localhost:5173/password/request');
  65 |     await page.fill('input[name="email"]', VALID_USER.email);
  66 |     await page.click('button[type="submit"]');
  67 |     
  68 |     await expect(page.locator('body')).toContainText(/success/i);
  69 |   });
  70 | 
  71 |   test('Email Verification - Error (Invalid Key)', async ({ page }) => {
  72 |     await page.goto('http://localhost:5173/verify-email');
  73 |     await page.fill('input[name="key"]', 'invalid-key');
  74 |     await page.click('button[type="submit"]');
  75 |     
  76 |     await expect(page.locator('body')).toContainText(/error/i);
  77 |   });
  78 | });
  79 | 
```