import { AuthActionTypes, AuthActions, IAuthState } from '@types';

const initialState: IAuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isLogoutLoading: false,
  isUploadLoading: false,
  error: '',
  uploadError: '',
  resetLinkError: '',
  resetPasswordError: '',
};

export const authReducer = (
  state = initialState,
  action: AuthActions,
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: true,
        error: '',
      };
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case AuthActionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
        error: action.payload,
      };
    case AuthActionTypes.LOGOUT_USER:
      return {
        ...state,
        isLogoutLoading: true,
        error: '',
      };
    case AuthActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLogoutLoading: false,
      };
    case AuthActionTypes.LOGOUT_USER_ERROR:
      return {
        ...state,
        isLogoutLoading: false,
        error: action.payload,
      };
    case AuthActionTypes.CHECK_USER:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case AuthActionTypes.CHECK_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case AuthActionTypes.CHECK_USER_ERROR:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
        error: action.payload,
      };
    case AuthActionTypes.RESET_ERROR:
      return {
        ...state,
        error: '',
        uploadError: '',
        resetLinkError: '',
        resetPasswordError: '',
      };
    case AuthActionTypes.ON_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case AuthActionTypes.ON_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case AuthActionTypes.ON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case AuthActionTypes.UPLOAD_PHOTO:
      return {
        ...state,
        isUploadLoading: true,
        error: '',
      };
    case AuthActionTypes.UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isUploadLoading: false,
      };
    case AuthActionTypes.UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        isUploadLoading: false,
        uploadError: action.payload,
      };
    case AuthActionTypes.RESET_LINK_ERROR:
      return {
        ...state,
        isLoading: false,
        resetLinkError: action.payload,
      };
    case AuthActionTypes.RESET_PASS_ERROR:
      return {
        ...state,
        isLoading: false,
        resetPasswordError: action.payload,
      };

    default:
      return state;
  }
};
