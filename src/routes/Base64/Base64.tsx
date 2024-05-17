import React, { useEffect, useState } from 'react';

import './Base64.scss';
import { classList } from '../../components/classList';

export const Base64 = () => {
  const [plaintext, setPlaintext] = useState<string>('Hello world!');
  const [encoded, setEncoded] = useState<string>();

  const convertTo = () => {
    if (plaintext) {
      setEncoded(btoa(plaintext));
    }
  };

  const convertFrom = () => {
    if (encoded) {
      setPlaintext(atob(encoded));
    }
  };

  return (
    <>
      <div className="converters">
        <div className="field-row-stacked">
          <label htmlFor="plaintext">Plaintext</label>
          <textarea
            id="plaintext"
            className={classList(['base64__textarea has-scrollbar'])}
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
        <div className="buttons">
          <button type="button" onClick={() => convertTo()}>
            &raquo;
          </button>
          <button type="button" onClick={() => convertFrom()}>
            &laquo;
          </button>
        </div>
        <div className="field-row-stacked">
          <label htmlFor="encoded">Encoded</label>
          <textarea
            id="encoded"
            className={classList(['base64__textarea has-scrollbar'])}
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
      </div>
    </>
  );
};
