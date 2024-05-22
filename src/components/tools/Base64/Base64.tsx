import React, { useEffect, useState } from 'react';

import './Base64.scss';
import { classList } from '../../classList';

export const Base64 = () => {
  const [plaintext, setPlaintext] = useState<string>('Hello world!');
  const [file, setFile] = useState<FileList>();
  const [includeDataUrl, setIncludeDataUrl] = useState(false);
  const [encoded, setEncoded] = useState<string>();
  const [currentTab, setCurrentTab] = useState<'plaintext' | 'file'>(
    'plaintext'
  );

  const getFileContent = (file: File | null): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject();
      } else {
        const reader = new FileReader();
        reader.onload = function () {
          const data = reader.result as ArrayBuffer;
          resolve(data);
        };
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const getMediaType = (file: File | null) => {
    if (!file) {
      return '';
    }

    return file.type;
  };

  const getFileSize = (size?: number) => {
    if (!size) {
      return;
    }

    if (size > 1000000) {
      return `${(size / 1024 / 1024).toPrecision(2)}Mb`;
    }

    return `${(size / 1024).toPrecision(2)}Kb`;
  };

  const convertTo = () => {
    if (plaintext && currentTab === 'plaintext') {
      setEncoded(btoa(plaintext));
    } else if (file && currentTab === 'file') {
      getFileContent(file.item(0)).then((x) => {
        const prefix = includeDataUrl
          ? `data:${getMediaType(file.item(0))};base64,`
          : '';
        try {
          setEncoded(prefix + btoa(String.fromCharCode(...new Uint8Array(x))));
        } catch (e) {
          alert(
            e.message && e.message.includes('stack size')
              ? 'File is too big'
              : `Something broke: ${e.message}`
          );
        }
      });
    }
  };

  const convertFrom = () => {
    if (encoded) {
      setPlaintext(atob(encoded));
      setCurrentTab('plaintext');
    }
  };

  return (
    <>
      <div className="converters">
        <div className="tabs">
          <ul className="tab-buttons">
            <li
              className={classList([
                'tab-button',
                currentTab === 'plaintext' ? 'tab-button--active' : '',
              ])}
            >
              <a
                href="#plaintext-tab"
                onClick={() => setCurrentTab('plaintext')}
              >
                Plaintext
              </a>
            </li>
            <li
              className={classList([
                'tab-button',
                currentTab === 'file' ? 'tab-button--active' : '',
              ])}
            >
              <a href="#file-tab" onClick={() => setCurrentTab('file')}>
                File
              </a>
            </li>
          </ul>
          <div
            className={classList([
              'tab-content',
              currentTab === 'plaintext' ? 'tab-content--active' : '',
            ])}
          >
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
          </div>
          <div
            className={classList([
              'tab-content',
              currentTab === 'file' ? 'tab-content--active' : '',
            ])}
          >
            <div className="field-group">
              <div className={classList(['dropzone', file ? 'has-file' : ''])}>
                <label htmlFor="file" className="show">
                  Drag file here or click to select
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setFile(e.target.files as FileList)}
                  />
                </label>
                {file && file.item(0) && (
                  <p className="file-name">
                    <b>{file.item(0)?.name}</b> (
                    {getFileSize(file.item(0)?.size)})
                  </p>
                )}
              </div>
              <label htmlFor="includeDataUri" className="show">
                <input
                  type="checkbox"
                  id="includeDataUri"
                  checked={includeDataUrl}
                  onChange={(e) => setIncludeDataUrl(e.target.checked)}
                />{' '}
                Include data URL
              </label>
            </div>
          </div>
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
