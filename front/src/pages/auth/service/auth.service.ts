import { AxiosError } from "axios";
import { authApi } from "../api/auth.api";

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(body: LoginRequest) {
    try {
      const response = await authApi.login(body);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Login failed: ${error.message}`);

      throw error;
    }
  }

  async signup(body: SignupRequest) {
    try {
      const response = await authApi.signup(body);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Login failed: ${error.message}`);

      throw error;
    }
  }
}
