import { useForm } from '@tanstack/react-form';
import { useSignupMutation } from '@oabta/allauth/react/hooks/auth/useAuthMutations';
import { useNavigate } from '@tanstack/react-router';

export const Signup = () => {
  const signup = useSignupMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: { username: '', email: '', password: '' },
    onSubmit: async ({ value }) => {
      signup.mutate(value, {
        onSuccess: () => navigate({ to: '/dashboard' })
      });
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="username" children={(field) => (
        <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Username" />
      )} />
      <form.Field name="email" children={(field) => (
        <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Email" />
      )} />
      <form.Field name="password" children={(field) => (
        <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} type="password" placeholder="Password" />
      )} />
      <button type="submit">Submit</button>
    </form>
  );
};
