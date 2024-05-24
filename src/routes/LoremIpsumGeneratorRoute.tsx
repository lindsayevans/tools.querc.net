import React from 'react';
import { LoremIpsumGenerator } from '../components/tools/LoremIpsumGenerator/LoremIpsumGenerator';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          <a rel="external" href="https://en.wikipedia.org/wiki/Lorem_ipsum">
            Lorem ipsum
          </a>{' '}
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </aside>
      <LoremIpsumGenerator />
    </>
  );
};
