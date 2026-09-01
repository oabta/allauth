import { useForm } from '@tanstack/react-form';
import { useChangePasswordMutation } from '@/react/hooks/auth/useAuthMutations';
import { ChangePasswordRequest } from '@/browser/types';

export const useChangePasswordForm = (onSuccess?: () => void) => {
  const mutation = useChangePasswordMutation();
  
  const form = useForm({
    defaultValues: { current_password: '', new_password: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate(value as ChangePasswordRequest, { onSuccess });
    },
  });

  return { form, mutation };
};
