import React from 'react';
import { CheckerboardGenerator } from '../components/tools/CheckerboardGenerator/CheckerboardGenerator';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>Create a checkerboard pattern.</p>
        <p>
          Useful for showing transparent parts of an image.
          <br />
          Or, I dunno, building a checkers game.
        </p>
      </aside>
      <CheckerboardGenerator />
    </>
  );
};
