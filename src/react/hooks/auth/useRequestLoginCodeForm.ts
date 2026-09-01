import { useForm } from '@tanstack/react-form';
import { useRequestLoginCodeMutation } from '@/react/hooks/auth/useAuthMutations';
import { RequestLoginCodeRequest } from '@/browser/types';

export const useRequestLoginCodeForm = (onSuccess?: () => void) => {
  const mutation = useRequestLoginCodeMutation();
  
  const form = useForm({
    defaultValues: { email: '', phone: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate(value as RequestLoginCodeRequest, { onSuccess });
    },
  });

  return { form, mutation };
};
