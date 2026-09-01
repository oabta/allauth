# @oabta/allauth

A unified, type-safe, and modular client library for `django-allauth` headless API, designed for seamless integration with the TanStack ecosystem.

---

## 🌟 Introduction
`@oabta/allauth` bridges the gap between Django's authentication system and modern React frontend architectures. Our goal is to provide a production-grade, extensible foundation for handling authentication workflows with state-of-the-art tools.

## 🚀 Features
- **Seamless Integration**: Built for TanStack Query, Form, and Router.
- **Type-Safe**: Strictly typed API contracts and request/response payloads.
- **Production-Ready**: Normalizes API errors, provides reusable hooks, and manages session state efficiently.

## 📦 Getting Started

### Installation
```bash
npm install @oabta/allauth
```

### Quick Usage

**1. Setup Provider:**
```tsx
import { AllauthProvider } from '@oabta/allauth/react';
import { AllauthTransport } from '@oabta/allauth/browser';

const transport = new AllauthTransport({ baseUrl: 'https://api.yourdomain.com' });

function App() {
  return (
    <AllauthProvider transport={transport} queryClient={queryClient}>
      <YourApp />
    </AllauthProvider>
  );
}
```

**2. Use Encapsulated Hooks & Auth Guard:**
```tsx
import { useLoginForm, createAuthRouteGuard } from '@oabta/allauth/react';

// Example: LoginForm Component
function LoginForm() {
  const { form } = useLoginForm(() => navigate({ to: '/dashboard' }));
  return <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>...</form>;
}

// Example: Auth Guard for Route
// You can customize the login path or excluded paths (e.g., for public auth routes)
export const Route = createFileRoute('/dashboard')({
  beforeLoad: createAuthRouteGuard(queryClient, { 
    loginPath: '/login',
    excludedPaths: ['/login', '/signup', '/forgot-password', '/verify-email'] 
  }),
  component: Dashboard,
});
```

## 🔐 Authentication Hooks & Workflows

We provide high-level, encapsulated hooks that bundle form logic and API mutations for seamless UI implementation.

### 1. Signup Flow
```tsx
import { useSignupForm } from '@oabta/allauth/react';
import { useNavigate } from '@tanstack/react-router';

function SignupForm() {
  const navigate = useNavigate();
  const { form } = useSignupForm(() => navigate({ to: '/dashboard' }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field name="username" children={(field) => (
        <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
      )} />
      {/* ... email and password fields ... */}
      <button type="submit">Signup</button>
    </form>
  );
}
```

### 2. Login Flow
```tsx
import { useLoginForm } from '@oabta/allauth/react';
import { useNavigate } from '@tanstack/react-router';

function LoginForm() {
  const navigate = useNavigate();
  const { form } = useLoginForm(() => navigate({ to: '/dashboard' }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field name="username" children={(field) => (
        <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
      )} />
      {/* ... password field ... */}
      <button type="submit">Login</button>
    </form>
  );
}
```

### 3. Other Authentication Mutations
For more granular control, you can use the lower-level mutation hooks directly:
- `useLogoutMutation`
- `useVerifyEmailMutation`
- `useRequestPasswordResetMutation`
- `useResetPasswordMutation`
- `useAuthenticate2FAMutation`

### 5. Dynamic Config-Driven Forms
The `django-allauth` headless API dictates required fields dynamically. Use the `useConfig` hook to adapt your UI:

```tsx
import { useConfig, useLoginForm } from '@oabta/allauth/react';

function LoginForm() {
  const { data: config } = useConfig();
  const { form } = useLoginForm();
  
  if (!config) return null;

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      {/* Conditionally render based on backend requirements */}
      {config.login_methods.includes('username') && (
        <form.Field name="username" children={(field) => (
          <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Username" />
        )} />
      )}
      {config.login_methods.includes('email') && (
        <form.Field name="email" children={(field) => (
          <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Email" />
        )} />
      )}
      {/* ... password ... */}
    </form>
  );
}
```

---

## 🧪 Testing
We maintain a robust suite of unit tests for all authentication hooks to ensure reliability.

### Running Tests
```bash
npm test
```
All hooks, including form wrappers and mutation handlers, are covered with success and error scenario tests in `tests/react/auth/authHooks.test.tsx`.

---

## 🤝 Contributing
Contributions are greatly appreciated. Please fork the project, create a feature branch, and submit a pull request.

## ⚖️ License
Distributed under the [MIT License](LICENSE).
