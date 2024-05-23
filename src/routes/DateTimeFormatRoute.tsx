import React from 'react';
import { DateTimeFormat } from '../components/tools/DateTimeFormat/DateTimeFormat';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Experiment with{' '}
          <a
            rel="external"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat"
          >
            Intl.DateTimeFormat
          </a>{' '}
          options
        </p>
      </aside>
      <DateTimeFormat />
    </>
  );
};
