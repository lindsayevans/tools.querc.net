import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import './Layout.scss';
import { classList } from '../components/classList';
import { Github, ThreeDotsVertical } from 'react-bootstrap-icons';

export const Layout = ({ callback }) => {
  React.useEffect(() => {
    callback.onUpdate = () => {
      if (confirm('New version available. Update?')) {
        window.location.reload();
      }
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      text: 'Generators',
      items: [
        {
          url: '/checkerboard-generator',
          text: 'Checkerboard',
        },
        {
          url: '/lorem-ipsum-generator',
          text: 'Lorem Ipsum',
        },
        {
          url: '/uuid-generator',
          text: 'UUID',
        },
        {
          url: '/zalgo-generator',
          text: 'Z̸͎͐a̴̭̍̄l̷̘̇g̸̻͈̀ö̸̤͍́̿',
        },
      ],
    },
    {
      text: 'Converters',
      items: [
        {
          url: '/base64-converter',
          text: 'Base64 converter',
        },
        {
          url: 'csv-json-converter',
          text: 'CSV ⇄ JSON converter',
        },
        {
          url: 'barcode-scanner',
          text: 'Barcode scanner',
          experimental: true,
        },
      ],
    },
    {
      text: 'Browser APIs',
      items: [
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
        {
          url: 'navigator-vibrate-playground',
          text: 'navigator.vibrate playground',
        },
      ],
    },
  ];

  return (
    <>
      <header>
        <h1>
          <Link to="/">
            tools<i>.</i>querc<i>.</i>net
          </Link>
        </h1>
        <nav className={classList([menuOpen ? 'open' : undefined])}>
          <button
            type="button"
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            title={menuOpen ? 'Hide menu' : 'Show menu'}
          >
            <ThreeDotsVertical size={24} />
          </button>
          <ul>
            {navItems.map((group) => (
              <li key={group.text}>
                <strong>{group.text}</strong>
                <ul>
                  {group.items.map((navItem) => (
                    <li
                      key={navItem.url}
                      className={navItem.experimental ? 'experimental' : ''}
                    >
                      <NavLink
                        to={navItem.url}
                        className={({ isActive, isPending }) =>
                          isActive ? 'active' : isPending ? 'pending' : ''
                        }
                        onClick={(e) => {
                          setMenuOpen(false);
                          (e.target as HTMLAnchorElement).blur();
                        }}
                      >
                        {navItem.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <small className="version">v{process.env.npm_package_version}</small>
      <a
        className="github"
        href="https://github.com/lindsayevans/tools.querc.net"
      >
        <Github size={24} title="View GitHub repository" />
      </a>
    </>
  );
};
