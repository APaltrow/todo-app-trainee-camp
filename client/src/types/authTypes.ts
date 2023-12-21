export interface IUser {
  email: string;
}

export interface IAuthState {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

export enum AuthActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
}

interface LoginAction {
  type: AuthActionTypes.LOGIN_USER;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_USER_SUCCESS;
  payload: IUser;
}

interface LoginErrorAction {
  type: AuthActionTypes.LOGIN_USER_ERROR;
  payload: string;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT_USER;
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;
