import React from 'react';
import { NavigatorVibrate } from '../components/tools/NavigatorVibrate/NavigatorVibrate';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Experiment with{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate"
            target="_blank"
          >
            navigator.vibrate
          </a>{' '}
          options.
        </p>
      </aside>
      <NavigatorVibrate />
    </>
  );
};
