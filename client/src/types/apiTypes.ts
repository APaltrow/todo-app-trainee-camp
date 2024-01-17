export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImg: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationCredentials extends ILoginCredentials {
  firstName: string;
  lastName: string;
  passwordConfirm: string;
}

export interface IChangePassCredentials {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface IResetPasswordCredentials {
  newPassword: string;
  newPasswordConfirm: string;
  resetLink: string;
}
