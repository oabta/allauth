import { useLogoutMutation } from '@oabta/allauth/react/hooks/auth/useAuthMutations';
import { useNavigate } from '@tanstack/react-router';

export const Dashboard = () => {
  const logout = useLogoutMutation();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button id="logout" onClick={() => logout.mutate(undefined, {
        onSuccess: () => navigate({ to: '/login' })
      })}>Logout</button>
    </div>
  );
};
