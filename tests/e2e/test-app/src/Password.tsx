import { useForm } from '@tanstack/react-form';
import { useRequestPasswordResetMutation, useResetPasswordMutation } from '@oabta/allauth/react';

export const RequestPassword = () => {
  const request = useRequestPasswordResetMutation();
  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => { request.mutate(value.email); },
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="email" children={(field) => <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Email" />} />
      <button type="submit">Request Reset</button>
    </form>
  );
};

export const ResetPassword = () => {
  const reset = useResetPasswordMutation();
  const form = useForm({
    defaultValues: { key: '', password: '' },
    onSubmit: async ({ value }) => { reset.mutate({ key: value.key, password: value.password }); },
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field name="key" children={(field) => <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Key" />} />
      <form.Field name="password" children={(field) => <input name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="New Password" />} />
      <button type="submit">Reset</button>
    </form>
  );
};
