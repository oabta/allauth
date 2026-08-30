import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAllauth } from 'src/react/context/AllauthProvider';
import { SignupRequest, VerifyEmailRequest, RequestPasswordRequest, ResetPasswordRequest } from 'src/browser/types';
import { AllAuthApi } from 'src/browser/index';

export const useSignupMutation = () => {
  const { transport, queryClient } = useAllauth();
  const api = new AllAuthApi(transport);
  return useMutation({
    mutationFn: (data: SignupRequest) => api.signup(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'session'] }),
  });
};

export const useLogoutMutation = () => {
  const { transport, queryClient } = useAllauth();
  const api = new AllAuthApi(transport);
  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => queryClient.setQueryData(['auth', 'session'], null),
  });
};

export const useVerifyEmailMutation = () => {
  const { transport } = useAllauth();
  const api = new AllAuthApi(transport);
  return useMutation({
    mutationFn: (key: string) => api.verifyEmail(key),
  });
};

export const useRequestPasswordResetMutation = () => {
  const { transport } = useAllauth();
  const api = new AllAuthApi(transport);
  return useMutation({
    mutationFn: (email: string) => api.requestPassword(email),
  });
};

export const useResetPasswordMutation = () => {
  const { transport } = useAllauth();
  const api = new AllAuthApi(transport);
  return useMutation({
    mutationFn: ({ key, password }: { key: string; password: string }) => 
      api.resetPassword(key, password),
  });
};
