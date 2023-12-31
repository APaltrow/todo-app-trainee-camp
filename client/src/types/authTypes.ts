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
  LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
  LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR',
  CHECK_USER = 'CHECK_USER',
  CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS',
  CHECK_USER_ERROR = 'CHECK_USER_ERROR',
  RESET_ERROR = 'RESET_ERROR',
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

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_USER_SUCCESS;
}

interface LogoutErrorAction {
  type: AuthActionTypes.LOGOUT_USER_ERROR;
  payload: string;
}

interface CheckUserAction {
  type: AuthActionTypes.CHECK_USER;
}

interface CheckUserSuccessAction {
  type: AuthActionTypes.CHECK_USER_SUCCESS;
  payload: IUser;
}

interface CheckUserErrorAction {
  type: AuthActionTypes.CHECK_USER_ERROR;
  payload: string;
}

interface ResetErrorAction {
  type: AuthActionTypes.RESET_ERROR;
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutErrorAction
  | CheckUserAction
  | CheckUserSuccessAction
  | CheckUserErrorAction
  | ResetErrorAction;
