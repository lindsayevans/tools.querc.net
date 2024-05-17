import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './routes/Error';
import { Layout } from './routes/Layout';
import { Base64 } from './routes/Base64/Base64';
import { DateTimeFormat } from './routes/DateTimeFormat/DateTimeFormat';
import { Homepage } from './routes/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'base-64',
        element: <Base64 />,
      },
      {
        path: 'date-time-format',
        element: <DateTimeFormat />,
      },
    ],
  },
]);

const $app = document.getElementById('app');

if ($app) {
  const root = createRoot($app);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
