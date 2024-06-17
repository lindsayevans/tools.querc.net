import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Layout } from './routes/Layout';
import { ErrorPage } from './routes/Error';
import { Homepage } from './routes/Homepage';

const callback: { onUpdate?: () => void } = {};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout callback={callback} />,
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
        path: 'barcode-scanner',
        lazy: () => import('./routes/BarcodeScannerRoute'),
      },
      {
        path: 'date-time-format-playground',
        lazy: () => import('./routes/DateTimeFormatRoute'),
      },
      {
        path: 'relative-time-format-playground',
        lazy: () => import('./routes/RelativeTimeFormatRoute'),
      },
      {
        path: 'duration-format-playground',
        lazy: () => import('./routes/DurationFormatRoute'),
      },
      {
        path: 'checkerboard-generator',
        lazy: () => import('./routes/CheckerboardGenerator'),
      },
      {
        path: 'lorem-ipsum-generator',
        lazy: () => import('./routes/LoremIpsumGeneratorRoute'),
      },
      {
        path: 'uuid-generator',
        lazy: () => import('./routes/UuidGeneratorRoute'),
      },
      {
        path: 'navigator-vibrate-playground',
        lazy: () => import('./routes/NavigatorVibrateRoute'),
      },
    ],
  },
]);

const $app = document.getElementById('app');

if ($app) {
  const root = createRoot($app);

  root.render(
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
  );

  serviceWorkerRegistration.register({
    onUpdate: () => {
      if (callback.onUpdate) {
        callback.onUpdate();
      }
    },
  });
}
