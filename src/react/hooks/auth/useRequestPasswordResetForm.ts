import { useForm } from '@tanstack/react-form';
import { useRequestPasswordResetMutation } from '@/react/hooks/auth/useAuthMutations';

export const useRequestPasswordResetForm = (onSuccess?: () => void) => {
  const mutation = useRequestPasswordResetMutation();
  
  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.email, { onSuccess });
    },
  });

  return { form, mutation };
};
