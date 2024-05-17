import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './Layout.scss';

export const Layout = () => {
  return (
    <>
      <header>
        <h1>
          <Link to="/">tools.querc.net</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={`/base-64`}>Base64 converter</Link>
            </li>
            <li>
              <Link to={`/date-time-format`}>DateTimeFormat playground</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
