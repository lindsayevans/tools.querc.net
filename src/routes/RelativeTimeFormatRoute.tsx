import React from 'react';
import { RelativeTimeFormat } from '../components/tools/RelativeTimeFormat/RelativeTimeFormat';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Experiment with{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat">
            Intl.RelativeTimeFormat
          </a>{' '}
          options
        </p>
      </aside>
      <RelativeTimeFormat />
    </>
  );
};
