import { useForm } from '@tanstack/react-form';
import { useVerifyEmailMutation } from '@oabta/allauth/react/hooks/auth/useAuthMutations';

export const VerifyEmail = () => {
  const verify = useVerifyEmailMutation();
  const form = useForm({
    defaultValues: { key: '' },
    onSubmit: async ({ value }) => { verify.mutate(value.key); },
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="key" children={(field) => <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Key" />} />
      <button type="submit">Verify</button>
    </form>
  );
};
