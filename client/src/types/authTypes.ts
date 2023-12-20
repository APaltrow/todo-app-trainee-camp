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

export type AuthActions = LoginAction | LoginSuccessAction | LoginErrorAction;
