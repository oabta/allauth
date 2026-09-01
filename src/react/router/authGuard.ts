import { redirect } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

export interface AuthGuardOptions {
  loginPath?: string;
  excludedPaths?: string[];
}

export const createAuthRouteGuard = (
  queryClient: QueryClient,
  { loginPath = '/login', excludedPaths = ['/login', '/signup', '/forgot-password', '/verify-email'] }: AuthGuardOptions = {}
) => {
  return async ({ location }: { location: { pathname: string } }) => {
    // Skip if on a public path
    if (excludedPaths.includes(location.pathname)) {
      return;
    }

    const session = await queryClient.getQueryData(['auth', 'session']);
    if (!session) {
      throw redirect({ to: loginPath });
    }
  };
};
