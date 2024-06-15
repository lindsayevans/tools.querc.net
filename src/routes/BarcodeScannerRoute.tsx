import React from 'react';
import { BarcodeScanner } from '../components/tools/BarcodeScanner/BarcodeScanner';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>
          Scan barcodes.
          <br />
          Only works on{' '}
          <a href="https://caniuse.com/?search=BarcodeDetector" target="_blank">
            certain devices
          </a>
          .
        </p>
      </aside>
      <BarcodeScanner />
    </>
  );
};
