import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './routes/Layout';
import { ErrorPage } from './routes/Error';
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
        path: 'base64-converter',
        lazy: () => import('./routes/Base64Route'),
      },
      {
        path: 'csv-json-converter',
        lazy: () => import('./routes/CsvJsonConverterRoute'),
      },
      {
        path: 'date-time-format-playground',
        lazy: () => import('./routes/DateTimeFormatRoute'),
      },
      {
        path: 'relative-time-format-playground',
        lazy: () => import('./routes/RelativeTimeFormatRoute'),
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
