import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

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
              <NavLink
                to={`/base-64`}
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
              >
                Base64 converter
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/date-time-format`}
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
              >
                DateTimeFormat playground
              </NavLink>
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
