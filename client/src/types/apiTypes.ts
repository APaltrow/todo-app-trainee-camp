export interface IAuthResponse {
  accessToken: string;
  email: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationCredentials extends ILoginCredentials {
  passwordConfirm: string;
}
