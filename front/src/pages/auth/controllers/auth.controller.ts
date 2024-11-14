import { STORAGE_KEY } from "../../../storage/const/storage.const";
import { IStorage } from "../../../storage/interfaces/storage.inteface";
import { AuthService } from "../service/auth.service";
import { INavigationService } from "../../../router/interfaces/navigation.interface";
import { ROUTES } from "../../../router/const/routes.const";

export class AuthController {
  constructor(
    private authService: AuthService,
    private storage: IStorage,
    private navigate: INavigationService
  ) {}

  async handleLogin(loginRequest: LoginRequest): Promise<void> {
    try {
      const response = await this.authService.login(loginRequest);
      this.storage.set(STORAGE_KEY.TOKEN, response.token);
      this.navigate.replace(ROUTES.TODOS);
    } catch (error) {
      console.error(error);
    }
  }

  async handleSignup(signupRequest: SignupRequest): Promise<void> {
    try {
      const response = await this.authService.signup(signupRequest);
      this.storage.set(STORAGE_KEY.TOKEN, response.token);
      this.navigate.replace(ROUTES.TODOS);
    } catch (error) {
      console.error(error);
    }
  }
}
