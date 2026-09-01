import { useForm } from '@tanstack/react-form';
import { useTrustBrowserMutation } from '@/react/hooks/auth/useAuthMutations';

export const useTrustBrowserForm = (onSuccess?: () => void) => {
  const mutation = useTrustBrowserMutation();
  
  const form = useForm({
    defaultValues: { trust: false },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.trust, { onSuccess });
    },
  });

  return { form, mutation };
};
