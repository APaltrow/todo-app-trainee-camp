import { AuthActionTypes, AuthActions, IAuthState } from '@types';

const initialState: IAuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: '',
};

export const authReducer = (
  state = initialState,
  action: AuthActions,
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
      return {
        user: null,
        isAuth: false,
        isLoading: true,
        error: '',
      };
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      return {
        user: action.payload,
        isAuth: true,
        isLoading: false,
        error: '',
      };
    case AuthActionTypes.LOGIN_USER_ERROR:
      return {
        user: null,
        isAuth: false,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
