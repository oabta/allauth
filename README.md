# @oabta/allauth

A unified, type-safe, and modular client library for `django-allauth` headless API, designed for seamless integration with the TanStack ecosystem.

## Vision
The goal of `@oabta/allauth` is to provide a production-grade, extensible bridge between Django's authentication system and modern React frontend architectures. By leveraging TanStack Query, Form, and Router, we deliver a cohesive experience for handling:

- **State Management**: Caching, session synchronization, and API fetching.
- **Form Handling**: Validation, submission, and API error normalization for Auth workflows.
- **Route Protection**: Seamless auth guards and navigation handling.

## Project Structure
```text
src/
├── browser/             # Low-level API client & utility layer
├── react/
│   ├── context/         # Auth Provider & Context
│   ├── hooks/           # TanStack Query auth hooks
│   ├── forms/           # TanStack Form abstractions
│   └── router/          # Router protection utilities
tests/                   # Unified top-level test suite
```

## Getting Started

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

## Practical Examples

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

### 2. Protected Route (TanStack Router)
```tsx
import { createAuthRouteGuard } from '@oabta/allauth/react/router/authGuard';
import { queryClient } from './queryClient'; // Your QueryClient instance

const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: createAuthRouteGuard(queryClient),
  component: Dashboard,
});
```

## Development
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Test**: `npm test`
