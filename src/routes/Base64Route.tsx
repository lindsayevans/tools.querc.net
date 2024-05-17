import React from 'react';
import { Base64 } from '../components/tools/Base64/Base64';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Convert to/from{' '}
          <a href="https://en.wikipedia.org/wiki/Base64">Base64</a>
        </p>
      </aside>
      <Base64 />
    </>
  );
};
