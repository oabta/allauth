import { useForm } from '@tanstack/react-form';
import { useConfirmLoginCodeMutation } from '@/react/hooks/auth/useAuthMutations';

export const useConfirmLoginCodeForm = (onSuccess?: () => void) => {
  const mutation = useConfirmLoginCodeMutation();
  
  const form = useForm({
    defaultValues: { code: '' },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.code, { onSuccess });
    },
  });

  return { form, mutation };
};
