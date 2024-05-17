import React, { useEffect, useState } from 'react';

import './Base64.scss';
import { classList } from '../../classList';

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
        <div className="field-group">
          <label htmlFor="plaintext">Plaintext</label>
          <textarea
            id="plaintext"
            className="textarea"
            value={plaintext}
            rows={15}
            onChange={(e) => setPlaintext(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
        <div className="buttons">
          <button type="button" onClick={() => convertTo()}>
            Encode&nbsp;&raquo;
          </button>
          <button type="button" onClick={() => convertFrom()}>
            &laquo;&nbsp;Decode
          </button>
        </div>
        <div className="field-group">
          <label htmlFor="encoded">Encoded</label>
          <textarea
            id="encoded"
            className="textarea"
            value={encoded}
            rows={15}
            onChange={(e) => setEncoded(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
      </div>
    </>
  );
};
