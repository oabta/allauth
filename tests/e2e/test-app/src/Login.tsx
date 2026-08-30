import { useForm } from '@tanstack/react-form';
import { useLoginMutation } from '@oabta/allauth/react/hooks/auth/useLoginMutation';
import { useNavigate } from '@tanstack/react-router';

export const Login = () => {
  const login = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: { username: '', password: '' },
    onSubmit: async ({ value }) => {
      login.mutate(value, {
        onSuccess: () => navigate({ to: '/dashboard' })
      });
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="username" children={(field) => (
        <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Username" />
      )} />
      <form.Field name="password" children={(field) => (
        <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} type="password" placeholder="Password" />
      )} />
      <button type="submit">Submit</button>
    </form>
  );
};
