import React from 'react';
import { BarcodeScanner } from '../components/tools/BarcodeScanner/BarcodeScanner';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>Scan barcodes</p>
      </aside>
      <BarcodeScanner />
    </>
  );
};
