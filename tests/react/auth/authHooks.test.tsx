import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { AllauthTransport } from '@/browser/transport';
import { AllauthProvider } from '@/react/context/AllauthProvider';
import { 
  useLoginMutation, 
  useLogoutMutation, 
  useVerifyEmailMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useAuthenticate2FAMutation,
  useTrustBrowserMutation,
  useRequestLoginCodeMutation,
  useConfirmLoginCodeMutation
} from '@/react/hooks/auth/useAuthMutations';
import { useLoginForm } from '@/react/hooks/auth/useLoginForm';
import { useSignupForm } from '@/react/hooks/auth/useSignupForm';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const createWrapper = () => {
    const transport = new AllauthTransport({ baseUrl: '' });
    const queryClient = new QueryClient();
    return ({ children }: any) => (
      <AllauthProvider transport={transport} queryClient={queryClient}>
        {children}
      </AllauthProvider>
    );
};

describe('Auth Hooks', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ status: 200, data: {} }),
        }));
    });

    it('useLoginMutation should work', async () => {
        const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper() });
        result.current.mutate({ username: 'user', password: 'password' });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useLogoutMutation should work', async () => {
        const { result } = renderHook(() => useLogoutMutation(), { wrapper: createWrapper() });
        result.current.mutate();
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useVerifyEmailMutation should work', async () => {
        const { result } = renderHook(() => useVerifyEmailMutation(), { wrapper: createWrapper() });
        result.current.mutate('key');
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useRequestPasswordResetMutation should work', async () => {
        const { result } = renderHook(() => useRequestPasswordResetMutation(), { wrapper: createWrapper() });
        result.current.mutate('test@test.com');
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useResetPasswordMutation should work', async () => {
        const { result } = renderHook(() => useResetPasswordMutation(), { wrapper: createWrapper() });
        result.current.mutate({ key: 'key', password: 'newPassword' });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useAuthenticate2FAMutation should work', async () => {
        const { result } = renderHook(() => useAuthenticate2FAMutation(), { wrapper: createWrapper() });
        result.current.mutate('123456');
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useTrustBrowserMutation should work', async () => {
        const { result } = renderHook(() => useTrustBrowserMutation(), { wrapper: createWrapper() });
        result.current.mutate(true);
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useRequestLoginCodeMutation should work', async () => {
        const { result } = renderHook(() => useRequestLoginCodeMutation(), { wrapper: createWrapper() });
        result.current.mutate({ email: 'test@test.com' });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useConfirmLoginCodeMutation should work', async () => {
        const { result } = renderHook(() => useConfirmLoginCodeMutation(), { wrapper: createWrapper() });
        result.current.mutate('123456');
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });

    it('useSignupForm should work', async () => {
        const { result } = renderHook(() => useSignupForm(), { wrapper: createWrapper() });
        result.current.form.setFieldValue('username', 'testuser');
        result.current.form.setFieldValue('email', 'test@test.com');
        result.current.form.setFieldValue('password', 'Password123!');
        await result.current.form.handleSubmit();
        await waitFor(() => expect(result.current.signup.isSuccess).toBe(true));
    });

    it('useLoginForm should work', async () => {
        const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper() });
        result.current.form.setFieldValue('username', 'testuser');
        result.current.form.setFieldValue('password', 'Password123!');
        await result.current.form.handleSubmit();
        await waitFor(() => expect(result.current.login.isSuccess).toBe(true));
    });
});
