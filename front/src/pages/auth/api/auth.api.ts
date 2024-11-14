import apiClient from "../../../api/api";

export const authApi = {
  login: (body: LoginRequest) =>
    apiClient.post<LoginResponse>("/users/login", body),
  signup: (body: SignupRequest) =>
    apiClient.post<SignupResponse>("/users/create", body),
};
