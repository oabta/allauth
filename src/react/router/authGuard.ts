import { redirect } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

export const createAuthRouteGuard = (queryClient: QueryClient) => {
  return async () => {
    const session = await queryClient.getQueryData(['auth', 'session']);
    if (!session) {
      throw redirect({ to: '/login' });
    }
  };
};
