import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import './Layout.scss';
import { classList } from '../components/classList';

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      url: '/base64-converter',
      text: 'Base64 converter',
    },
    {
      url: 'csv-json-converter',
      text: 'CSV ⇄ JSON converter',
    },
    {
      url: 'date-time-format-playground',
      text: 'DateTimeFormat playground',
    },
    {
      url: 'relative-time-format-playground',
      text: 'RelativeTimeFormat playground',
    },
    {
      url: 'duration-format-playground',
      text: 'DurationFormat playground',
    },
  ];

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
            {navItems.map((navItem) => (
              <li key={navItem.url}>
                <NavLink
                  to={navItem.url}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {navItem.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <a
        className="github"
        href="https://github.com/lindsayevans/tools.querc.net"
      >
        <img
          src="/github-mark-white.svg"
          width={24}
          height={24}
          alt="View GitHub repository"
        />
      </a>
    </>
  );
};
