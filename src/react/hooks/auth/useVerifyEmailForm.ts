import { useForm } from '@tanstack/react-form';
import { useVerifyEmailMutation } from '@/react/hooks/auth/useAuthMutations';

export const useVerifyEmailForm = (onSuccess?: () => void) => {
  const mutation = useVerifyEmailMutation();
  
  const form = useForm({
    defaultValues: { key: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.key, { onSuccess });
    },
  });

  return { form, mutation };
};
