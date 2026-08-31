import { useLoginForm } from '@oabta/allauth/react';
import { useNavigate } from '@tanstack/react-router';

export const Login = () => {
  const navigate = useNavigate();
  const { form } = useLoginForm(() => navigate({ to: '/dashboard' }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="username" children={(field) => (
        <input id="username" name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Username" />
      )} />
      <form.Field name="password" children={(field) => (
        <input id="password" name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} type="password" placeholder="Password" />
      )} />
      <button type="submit">Submit</button>
    </form>
  );
};
