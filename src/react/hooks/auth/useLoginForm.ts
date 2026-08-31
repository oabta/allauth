import { useForm } from '@tanstack/react-form';
import { useLoginMutation } from '@/react/hooks/auth/useAuthMutations';

export const useLoginForm = (onSuccess?: () => void) => {
  const login = useLoginMutation();
  
  const form = useForm({
    defaultValues: { username: '', password: '' },
    onSubmit: async ({ value }) => {
      login.mutate(value, { onSuccess });
    },
  });

  return { form, login };
};
