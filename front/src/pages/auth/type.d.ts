type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

type SignupRequest = {
  email: string;
  password: string;
};

type SignupResponse = {
  token: string;
  message: string;
};
