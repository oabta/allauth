import { useQuery } from '@tanstack/react-query';
import { useAllauth } from '@/react/context/AllauthProvider';

export const useConfig = () => {
  const { api } = useAllauth();
  
  return useQuery({
    queryKey: ['auth', 'config'],
    queryFn: () => api.getConfig(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};
