import { createContext, useMemo } from "react";
import { NavigateFunction } from "react-router-dom";
import { RouterNavigationService } from "../../../router/services/routerNavigation.service";
import { LocalStorageService } from "../../../storage/services/storage.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../service/auth.service";

interface AuthContextType {
  authController: AuthController;
}

interface AuthProviderProps {
  children: React.ReactNode;
  navigate: NavigateFunction;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children, navigate }: AuthProviderProps) => {
  const authController = useMemo(() => {
    const storage = LocalStorageService.getInstance();
    const authService = AuthService.getInstance();
    const navigationService = new RouterNavigationService(navigate);

    return new AuthController(authService, storage, navigationService);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ authController }}>
      {children}
    </AuthContext.Provider>
  );
};
