import React from 'react';
import { CsvJsonConverter } from '../components/tools/CsvJsonConverter/CsvJsonConverter';

export const Component = () => {
  return (
    <>
      <aside className="introduction">
        <p>Convert to/from CSV/JSON</p>
      </aside>
      <CsvJsonConverter />
    </>
  );
};
