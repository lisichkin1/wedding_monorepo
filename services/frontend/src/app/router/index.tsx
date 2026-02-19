import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import inviteRoute from '@pages/invite/route';
import { ErrorFallback } from '@shared/ui';
import { MainLayout } from '../layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MainLayout />
      </ErrorBoundary>
    ),

    children: [inviteRoute]
  }
]);
