import { ReactNode } from 'react';
import useAuth from '../utils/hooks/useAuth';
import LoginForm from '../pages/Login';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <>
      {children}
    </>
  );
}
