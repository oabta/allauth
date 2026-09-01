import { useForm } from '@tanstack/react-form';
import { useResetPasswordMutation } from '@/react/hooks/auth/useAuthMutations';

export const useResetPasswordForm = (onSuccess?: () => void) => {
  const mutation = useResetPasswordMutation();
  
  const form = useForm({
    defaultValues: { key: '', password: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate({ key: value.key, password: value.password }, { onSuccess });
    },
  });

  return { form, mutation };
};
