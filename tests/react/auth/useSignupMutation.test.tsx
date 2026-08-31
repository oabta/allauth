import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllauthTransport } from '@/browser/transport';
import { AllauthProvider } from '@/react/context/AllauthProvider';
import { useSignupMutation } from '@/react/hooks/auth/useAuthMutations';
import { vi, describe, it, expect } from 'vitest';

describe('useSignupMutation', () => {
  it('should call api.signup on mutate and handle success', async () => {
    const transport = new AllauthTransport({ baseUrl: '' });
    const queryClient = new QueryClient();

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: 200, data: {} }),
    }));

    const wrapper = ({ children }: any) => (
      <AllauthProvider transport={transport} queryClient={queryClient}>
        {children}
      </AllauthProvider>
    );
    const { result } = renderHook(() => useSignupMutation(), { wrapper });

    result.current.mutate({ username: 'testuser', email: 'test@example.com', password: 'Password123!' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('should handle signup errors', async () => {
    const transport = new AllauthTransport({ baseUrl: '' });
    const queryClient = new QueryClient();

    // Mock fetch to return error
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ status: 400, data: { username: ['Already exists'] } }),
    }));

    const wrapper = ({ children }: any) => (
      <AllauthProvider transport={transport} queryClient={queryClient}>
        {children}
      </AllauthProvider>
    );
    const { result } = renderHook(() => useSignupMutation(), { wrapper });

    result.current.mutate({ username: 'testuser', email: 'test@example.com', password: 'Password123!' });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
