import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import './Layout.scss';
import { classList } from '../components/classList';

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header>
        <h1>
          <Link to="/">tools.querc.net</Link>
        </h1>
        <nav className={classList([menuOpen ? 'open' : undefined])}>
          <button
            type="button"
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            title={menuOpen ? 'Hide menu' : 'Show menu'}
          >
            🍔
          </button>
          <ul>
            <li>
              <NavLink
                to={`/base-64`}
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
