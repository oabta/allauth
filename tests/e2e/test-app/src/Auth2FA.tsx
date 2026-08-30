import { useForm } from '@tanstack/react-form';
import { useAuthenticate2FAMutation } from '@oabta/allauth/react/hooks/auth/useAuthMutations';

export const Auth2FA = () => {
  const auth2fa = useAuthenticate2FAMutation();
  const form = useForm({
    defaultValues: { code: '' },
    onSubmit: async ({ value }) => { auth2fa.mutate(value.code); },
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="code" children={(field) => <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="2FA Code" />} />
      <button type="submit">Verify 2FA</button>
    </form>
  );
};
