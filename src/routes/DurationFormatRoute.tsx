import React from 'react';
import { DurationFormat } from '../components/tools/DurationFormat/DurationFormat';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Experiment with{' '}
          <a
            rel="external"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat"
          >
            Intl.DurationFormat
          </a>{' '}
          options
        </p>
        <p>
          <strong>Note:</strong> You'll need a{' '}
          <a
            rel="external"
            href="https://www.npmjs.com/package/@formatjs/intl-durationformat"
          >
            polyfill
          </a>{' '}
          until{' '}
          <a
            rel="external"
            href="https://caniuse.com/?search=Intl.DurationFormat"
          >
            browser support improves
          </a>
          .
        </p>
      </aside>
      <DurationFormat />
    </>
  );
};
