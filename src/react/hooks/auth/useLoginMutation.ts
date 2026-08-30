import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAllauth } from '@/react/context/AllauthProvider';
import { LoginRequest } from '@/browser/types';

export const useLoginMutation = () => {
  const { api, queryClient } = useAllauth();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => api.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
