# @allauth/browser

A production-ready, browser-only TypeScript SDK for interacting with the [django-allauth](https://github.com/pennersr/django-allauth) Headless API (`/_allauth/browser/v1/`).

## Features

- **Browser-Native**: Designed exclusively for web browsers.
- **Secure**: Automatically handles CSRF token extraction from cookies and attaches `X-CSRFToken` headers to mutating requests.
- **CORS Support**: Enforces `credentials: 'include'` on all requests to support cross-origin cookie passing.
- **Type-Safe**: Comprehensive TypeScript definitions reflecting the `django-allauth` Headless API contract.

## Installation

```bash
npm install @allauth/browser
```

## Quick Start

```typescript
import { AllauthClient, AllAuthApi } from '@allauth/browser';

// Initialize the client
const client = new AllauthClient({
  baseUrl: '/_allauth/browser/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Create the API wrapper
const auth = new AllAuthApi(client);

// Example: Get session status
async function checkAuth() {
  const response = await auth.getSession();
  console.log('Session data:', response.data);
}
```

## Development

- **Build**: `npm run build`
- **Test**: `npm test`
- **Lint**: `npm run lint`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
