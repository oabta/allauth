# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/e2e/auth-flows.spec.ts >> Full Authentication Flow >> Home page
- Location: tests/e2e/auth-flows.spec.ts:18:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#root')
Expected substring: "Home"
Received string:    ""
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#root')
    14 × locator resolved to <div id="root"></div>
       - unexpected value ""

```

```yaml
- text: "[plugin:vite:import-analysis] Missing \"./react/hooks/auth/useAuthMutations\" specifier in \"@oabta/allauth\" package /Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/src/Password.tsx at e (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46042:25) at n (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46042:627) at o (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46042:1297) at resolveExportsOrImports (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46663:18) at resolveDeepImport (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46686:25) at tryNodeResolve (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46451:16) at ResolveIdContext.resolveId (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:46201:19) at process.processTicksAndRejections (node:internal/process/task_queues:104:5) at async PluginContainer.resolveId (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49017:22) at async TransformPluginContext.resolve (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49178:15) at async normalizeUrl (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64300:26) at async file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64439:39 at async Promise.all (index 4) at async TransformPluginContext.transform (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64366:7) at async PluginContainer.transform (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49099:18) at async loadAndTransform (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:51978:27) at async viteTransformMiddleware (file:///Users/matimu/Projects/oabta/allauth/tests/e2e/test-app/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:62106:24 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Run tests in order to handle empty backend state
  4  | test.describe.configure({ mode: 'serial' });
  5  | 
  6  | const TEST_USER = {
  7  |   username: 'e2e_test_user',
  8  |   email: 'e2e_test@example.com',
  9  |   password: 'Password123!',
  10 | };
  11 | 
  12 | test.describe('Full Authentication Flow', () => {
  13 |   test.beforeEach(async ({ page }) => {
  14 |     // Assumption: A test app using @oabta/allauth is running on localhost:5173
  15 |     await page.goto('http://localhost:5173');
  16 |   });
  17 | 
  18 |   test('Home page', async ({ page }) => {
  19 |     await page.goto('http://localhost:5173/');
> 20 |     await expect(page.locator('#root')).toContainText('Home');
     |                                         ^ Error: expect(locator).toContainText(expected) failed
  21 |   });
  22 | 
  23 |   test('Logout', async ({ page }) => {
  24 |     await page.click('button#logout');
  25 |     await expect(page).toHaveURL('/login');
  26 |   });
  27 | 
  28 |   test('Login', async ({ page }) => {
  29 |     await page.goto('/login');
  30 |     await page.fill('input[name="username"]', TEST_USER.username);
  31 |     await page.fill('input[name="password"]', TEST_USER.password);
  32 |     await page.click('button[type="submit"]');
  33 | 
  34 |     await expect(page).toHaveURL(/.*\/dashboard/);
  35 |   });
  36 | 
  37 |   test('Password Reset', async ({ page }) => {
  38 |     await page.goto('/password/reset');
  39 |     await page.fill('input[name="email"]', TEST_USER.email);
  40 |     await page.click('button[type="submit"]');
  41 |     
  42 |     // Check for success message
  43 |     await expect(page.locator('.success-message')).toBeVisible();
  44 |   });
  45 | });
  46 | 
```