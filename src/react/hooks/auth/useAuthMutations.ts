import { useMutation } from '@tanstack/react-query';
import { useAllauth } from '@/react/context/AllauthProvider';
import { SignupRequest, VerifyEmailRequest, RequestPasswordRequest, ResetPasswordRequest, ChangePasswordRequest } from '@/browser/types';

export const useSignupMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: (data: SignupRequest) => api.signup(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'session'] }),
  });
};

export const useLoginMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: (data: any) => api.login(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'session'] }),
  });
};

export const useLogoutMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => queryClient.setQueryData(['auth', 'session'], null),
  });
};

export const useVerifyEmailMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (key: string) => api.verifyEmail(key),
  });
};

export const useRequestPasswordResetMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (email: string) => api.requestPassword(email),
  });
};

export const useResetPasswordMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: ({ key, password }: { key: string; password: string }) => 
      api.resetPassword(key, password),
  });
};

export const useChangePasswordMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => api.changePassword(data),
  });
};

export const useAuthenticate2FAMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (code: string) => api.authenticate2FA(code),
  });
};

export const useTrustBrowserMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (trust: boolean) => api.trustBrowser(trust),
  });
};

export const useRequestLoginCodeMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (data: any) => api.requestLoginCode(data),
  });
};

export const useConfirmLoginCodeMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (code: string) => api.confirmLoginCode(code),
  });
};
