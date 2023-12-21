import { RoutesPaths } from '@constants';

import { LoginPage, HomePage } from '@pages';

export const AppRoutes = [
  {
    path: RoutesPaths.MAIN,
    element: <HomePage />,
  },
  {
    path: RoutesPaths.LOGIN,
    element: <LoginPage />,
  },
];
