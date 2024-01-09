import { RoutesPaths } from '@constants';

import { LoginPage, HomePage, RegistrationPage } from '@pages';

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
];
