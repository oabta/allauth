# @oabta/allauth

A monorepo containing the official TypeScript SDKs for interacting with the `django-allauth` Headless API.

## Packages

| Package | Description |
| :--- | :--- |
| [`@allauth/browser`](./packages/browser) | Low-level, browser-only TypeScript API client. |
| [`@allauth/react`](./packages/react) | Unified React integration with TanStack ecosystem support. |

## Development

This monorepo uses workspaces for package management.

### Prerequisites

- Node.js (v20+)
- npm (v10+)

### Setup

```bash
npm install
```

### Running Checks

To run tests or linting across all packages:

```bash
# Run tests for all packages
npm run test --workspaces

# Run lint for all packages
npm run lint --workspaces
```

## Contributing

Please see the individual package directories for specific contribution guidelines.
