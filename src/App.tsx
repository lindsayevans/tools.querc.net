import React from 'react';
import { Base64 } from './ProgramFiles/Base64/Base64';
import { DateTimeFormat } from './ProgramFiles/DateTimeFormat/DateTimeFormat';
import { ViewSource } from './ProgramFiles/ViewSource/ViewSource';

export const App = () => {
  return (
    <>
      <Base64 />
      <DateTimeFormat />
      <ViewSource />
    </>
  );
};
