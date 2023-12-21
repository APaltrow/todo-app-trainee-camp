import { createHashRouter } from 'react-router-dom';

import { RoutesPaths } from '@constants';

import { App } from '../App';

import { AppRoutes } from './appRoutes';

export const AppRouter = createHashRouter([
  {
    path: RoutesPaths.MAIN,
    element: <App />,
    children: AppRoutes,
  },
]);
