import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllauthTransport } from '@/browser/transport';
import { AllauthProvider } from '@/react/context/AllauthProvider';
import { useLoginMutation } from '@/react/hooks/auth/useLoginMutation';
import { vi, describe, it, expect } from 'vitest';

describe('useLoginMutation', () => {
  it('should call api.login on mutate', async () => {
    const transport = new AllauthTransport({ baseUrl: '', headers: {} });
    const queryClient = new QueryClient();

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ status: 200, data: {} }),
    }));

    const wrapper = ({ children }: any) => (
      <AllauthProvider transport={transport} queryClient={queryClient}>
        {children}
      </AllauthProvider>
    );
    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    result.current.mutate({ password: 'password', username: 'user' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
