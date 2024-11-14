import { useNavigate, Outlet } from "react-router-dom";
import { AuthProvider } from "../../pages/auth/contexts/auth.context";

export const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <Outlet />
    </AuthProvider>
  );
};
