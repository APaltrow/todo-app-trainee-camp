import { RoutesPaths } from '@constants';

import {
  LoginPage,
  HomePage,
  RegistrationPage,
  ProfilePage,
  ResetPasswordLinkPage,
  ResetPasswordPage,
  NotFoundPage,
} from '@pages';

export const AppRoutes = [
  {
    path: RoutesPaths.MAIN,
    element: <HomePage />,
  },
  {
    path: RoutesPaths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RoutesPaths.REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: RoutesPaths.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: RoutesPaths.RESET_PASSWORD,
    element: <ResetPasswordLinkPage />,
  },
  {
    path: RoutesPaths.RESET_PASSWORD_FORM,
    element: <ResetPasswordPage />,
  },
  {
    path: RoutesPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
