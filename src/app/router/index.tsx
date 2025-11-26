import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { ROUTES } from '@shared/constants';
import { MainLayout } from '../layouts/MainLayout';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />
      }
    ]
  }
]);
