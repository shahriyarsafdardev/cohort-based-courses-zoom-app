import { ReactNode } from "react";
import useAuth from "../utils/hooks/useAuth";
import LoginForm from "../pages/Login";
import { CircularProgress, Box } from "@material-ui/core";
// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
