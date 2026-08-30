import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllauthClient } from '@browser/client';
import { AllauthProvider } from '@react/context/AllauthProvider';
import { useLoginMutation } from '@react/hooks/auth/useLoginMutation';
import { vi, describe, it, expect } from 'vitest';

describe('useLoginMutation', () => {
  it('should call api.login on mutate', async () => {
    const client = new AllauthClient({ baseUrl: '', headers: {} });
    const queryClient = new QueryClient();
    
    // Mock fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ status: 200, data: {} }),
    }));

    const wrapper = ({ children }: any) => (
      <AllauthProvider client={client} queryClient={queryClient}>
        {children}
      </AllauthProvider>
    );

    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    result.current.mutate({ password: 'password', username: 'user' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
