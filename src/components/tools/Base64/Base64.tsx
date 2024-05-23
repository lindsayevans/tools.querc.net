import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons';

import './Base64.scss';
import { classList } from '../../classList';
import { Button } from '../../ui/Button';
import { Tabs } from '../../ui/Tabs/Tabs';
import { Tab } from '../../ui/Tabs/Tab';

type Tab = 'plaintext' | 'file';

export const Base64 = () => {
  const [plaintext, setPlaintext] = useState<string>('Hello world!');
  const [file, setFile] = useState<FileList>();
  const [download, setDownload] = useState<string>();
  const [includeDataUrl, setIncludeDataUrl] = useState(false);
  const [encoded, setEncoded] = useState<string>();
  const [currentTab, setCurrentTab] = useState<Tab>('plaintext');

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
      if (currentTab === 'plaintext') {
        setPlaintext(atob(encoded));
      } else {
        setDownload(encoded);
      }
    }
  };

  return (
    <>
      <div className="converters">
        <Tabs onChange={(tab) => setCurrentTab(tab as Tab)}>
          <Tab title="Plaintext">
            <div className="field-group">
              <label htmlFor="plaintext">Plaintext</label>
              <textarea
                id="plaintext"
                className="textarea"
                value={plaintext}
                rows={15}
                spellCheck={false}
                onChange={(e) => setPlaintext(e.target.value)}
                onFocus={(e) => e.target.select()}
              ></textarea>
            </div>
          </Tab>
          <Tab title="File">
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
              {download && (
                <p>
                  <a
                    href={
                      includeDataUrl
                        ? download
                        : `data:unknown;base64,${encoded}`
                    }
                    download={true}
                  >
                    Download
                  </a>
                </p>
              )}
              <label htmlFor="includeDataUri" className="checkbox-field show">
                <input
                  type="checkbox"
                  id="includeDataUri"
                  checked={includeDataUrl}
                  onChange={(e) => setIncludeDataUrl(e.target.checked)}
                />{' '}
                Include data URL {includeDataUrl}
              </label>
            </div>
          </Tab>
        </Tabs>

        <div className="buttons">
          <Button onClick={() => convertTo()} icon={<ArrowRightShort />}>
            Encode
          </Button>
          <Button
            onClick={() => convertFrom()}
            icon={<ArrowLeftShort />}
            iconPosition="left"
          >
            Decode
          </Button>
        </div>
        <div className="field-group">
          <label htmlFor="encoded">Encoded</label>
          <textarea
            id="encoded"
            className="textarea"
            value={encoded}
            rows={15}
            spellCheck={false}
            onChange={(e) => setEncoded(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
      </div>
    </>
  );
};
