import { AuthActionTypes, AuthActions, IAuthState } from '@types';

const initialState: IAuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isLogoutLoading: false,
  isUploadLoading: false,
  error: '',
  uploadError: '',
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
        isLogoutLoading: false,
        isUploadLoading: false,
        error: '',
        uploadError: '',
      };
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      return {
        user: action.payload,
        isAuth: true,
        isLoading: false,
        isLogoutLoading: false,
        isUploadLoading: false,
        error: '',
        uploadError: '',
      };
    case AuthActionTypes.LOGIN_USER_ERROR:
      return {
        user: null,
        isAuth: false,
        isLoading: false,
        isLogoutLoading: false,
        isUploadLoading: false,
        error: action.payload,
        uploadError: '',
      };
    case AuthActionTypes.LOGOUT_USER:
      return {
        ...state,
        isLogoutLoading: true,
        error: '',
      };
    case AuthActionTypes.LOGOUT_USER_SUCCESS:
      return {
        user: null,
        isAuth: false,
        isLoading: false,
        isLogoutLoading: false,
        isUploadLoading: false,
        error: '',
        uploadError: '',
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
        user: action.payload,
        isAuth: true,
        isLoading: false,
        isLogoutLoading: false,
        isUploadLoading: false,
        error: '',
        uploadError: '',
      };
    case AuthActionTypes.CHECK_USER_ERROR:
      return {
        user: null,
        isAuth: false,
        isLoading: false,
        isLogoutLoading: false,
        isUploadLoading: false,
        error: action.payload,
        uploadError: '',
      };
    case AuthActionTypes.RESET_ERROR:
      return {
        ...state,
        error: '',
        uploadError: '',
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
        error: '',
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
        error: '',
      };
    case AuthActionTypes.UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        isUploadLoading: false,
        uploadError: action.payload,
      };

    default:
      return state;
  }
};
