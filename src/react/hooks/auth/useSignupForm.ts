import { useForm } from '@tanstack/react-form';
import { useSignupMutation } from '@/react/hooks/auth/useAuthMutations';

export const useSignupForm = (onSuccess?: () => void) => {
  const signup = useSignupMutation();
  
  const form = useForm({
    defaultValues: { username: '', email: '', password: '' },
    onSubmit: async ({ value }) => {
      signup.mutate(value, { onSuccess });
    },
  });

  return { form, signup };
};
