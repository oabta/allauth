import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAllauth } from '@react/context/AllauthProvider';
import { LoginRequest, AllAuthApi } from '@browser/index';

export const useLoginMutation = () => {
  const { client } = useAllauth();
  const queryClient = useQueryClient();
  const api = new AllAuthApi(client);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => api.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
