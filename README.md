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

### 4. Dynamic Config-Driven Workflows
The `django-allauth` headless API controls the auth flow dynamically. Fetch the configuration first to adapt your UI:

```tsx
import { useConfig } from '@oabta/allauth/react/hooks/auth/useConfig';

function AuthForms() {
  const { data: config, isLoading } = useConfig();

  if (isLoading) return <div>Loading...</div>;

  // Use config.auth_methods to decide which forms to show
  return (
    <>
      {config.auth_methods.includes('password') && <LoginForm />}
      {config.allow_signup && <SignupForm />}
    </>
  );
}
```


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
