import React from 'react';
import { UuidGenerator } from '../components/tools/UuidGenerator/UuidGenerator';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Generate{' '}
          <a
            href="https://en.wikipedia.org/wiki/Universally_unique_identifier"
            target="_blank"
          >
            UUIDs
          </a>
          .
        </p>
      </aside>
      <UuidGenerator />
    </>
  );
};
