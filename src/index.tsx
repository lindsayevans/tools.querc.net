import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import '7.css/dist/7.css';

const $app = document.getElementById('app');

if ($app) {
  const root = createRoot($app);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
