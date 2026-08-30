# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/e2e/auth.spec.ts >> Authentication Flow >> should log in successfully
- Location: tests/e2e/auth.spec.ts:4:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication Flow', () => {
  4  |   test('should log in successfully', async ({ page }) => {
  5  |     // Navigate to your frontend app that uses @oabta/allauth
> 6  |     await page.goto('http://localhost:3000/login');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  7  | 
  8  |     // Fill in credentials
  9  |     await page.fill('input[name="username"]', 'testuser');
  10 |     await page.fill('input[name="password"]', 'testpassword');
  11 |     
  12 |     // Submit
  13 |     await page.click('button[type="submit"]');
  14 | 
  15 |     // Assert redirect to dashboard
  16 |     await expect(page).toHaveURL(/.*\/dashboard/);
  17 |   });
  18 | });
  19 | 
```