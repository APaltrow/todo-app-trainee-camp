export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationCredentials extends ILoginCredentials {
  passwordConfirm: string;
}
