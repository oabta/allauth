# @oabta/allauth

A unified, type-safe, and modular client library for `django-allauth` headless API, designed for seamless integration with the TanStack ecosystem.

---

## 🌟 Introduction
`@oabta/allauth` bridges the gap between Django's powerful authentication system and modern React frontend architectures. Our goal is to provide a production-grade, extensible foundation for handling authentication workflows with state-of-the-art tools.

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
```tsx
import { AllauthProvider } from '@oabta/allauth/react';
import { AllauthClient } from '@oabta/allauth/browser';

const client = new AllauthClient({ baseUrl: 'https://api.yourdomain.com' });

function App() {
  return (
    <AllauthProvider client={client} queryClient={queryClient}>
      <YourApp />
    </AllauthProvider>
  );
}
```

## 🔐 Authentication Workflows

### 1. Login Mutation (TanStack Query)
```tsx
import { useLoginMutation } from '@oabta/allauth/react/hooks/auth/useLoginMutation';

function LoginForm() {
  const loginMutation = useLoginMutation();

  const handleLogin = (data) => {
    loginMutation.mutate(data);
  };
  // ...
}
```

*Note: Internally, the library uses `AllAuthApi` initialized with `AllauthClient` to execute requests, ensuring a clean separation between transport and API implementation.*

### 2. Sign-up, Reset Password, & Verification
```tsx
// Signup
const signupMutation = useSignupMutation();
signupMutation.mutate({ username, email, password });

// Password Reset
const resetMutation = usePasswordResetMutation();
resetMutation.mutate({ email });

// Email Verification
const verifyMutation = useEmailVerificationMutation();
verifyMutation.mutate({ key: 'verification-key' });
```

### 3. Protected Route (TanStack Router)
```tsx
// src/routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';
import { createAuthRouteGuard } from '@oabta/allauth/react/router/authGuard';
import { queryClient } from '../queryClient'; 

export const Route = createFileRoute('/dashboard')({
  beforeLoad: createAuthRouteGuard(queryClient),
  component: Dashboard,
});
```

#### How it works:
- **`beforeLoad` Hook**: The `createAuthRouteGuard` is a high-order function that returns a `beforeLoad` handler, which TanStack Router executes *before* navigating to the route.
- **Session Validation**: It utilizes `queryClient.ensureQueryData` to check if a valid session exists.
- **Automatic Redirects**: If no session is found, it throws a `redirect` error, sending the user to your defined login route.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚖️ License
Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.
