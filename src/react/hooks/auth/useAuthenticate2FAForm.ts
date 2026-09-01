import { useForm } from '@tanstack/react-form';
import { useAuthenticate2FAMutation } from '@/react/hooks/auth/useAuthMutations';

export const useAuthenticate2FAForm = (onSuccess?: () => void) => {
  const mutation = useAuthenticate2FAMutation();
  
  const form = useForm({
    defaultValues: { code: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.code, { onSuccess });
    },
  });

  return { form, mutation };
};
