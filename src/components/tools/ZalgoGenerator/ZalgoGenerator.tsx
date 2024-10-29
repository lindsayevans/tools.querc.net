import React, { useEffect, useState } from 'react';
import zalgofy from 'zalgofy';

import { classList } from '../../classList';

import './ZalgoGenerator.scss';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { Button } from '../../ui/Button';
import {
  ArrowClockwise,
  Clipboard,
  ClipboardCheck,
} from 'react-bootstrap-icons';

const baseClass = 'zalgo-generator';

export type ZalgoParameters = {
  count: number;
};

const defaultParameters: ZalgoParameters = {
  count: 1,
};

export const ZalgoGenerator = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [parameters, setParameters] =
    useState<ZalgoParameters>(defaultParameters);
  const [zalgoParams, setZalgoParams] = useState<{
    maxAccentsUp: number;
    maxAccentsDown: number;
    maxAccentsMiddle: number;
    maxTotalAccents: number;
  }>({
    maxAccentsUp: parameters.count,
    maxAccentsDown: parameters.count,
    maxAccentsMiddle: parameters.count,
    maxTotalAccents: parameters.count,
  });
  const [copied, setCopied] = useState({ zalgo: false });
  const [plaintext, setPlaintext] = useState<string>(`In Xanadu did Kubla Khan
    A stately pleasure-dome decree`);
  const [zalgo, setZalgo] = useState<string>(zalgofy(plaintext, zalgoParams));

  useEffect(() => {
    const params: Partial<ZalgoParameters> = {};
    Array.from(searchParams.keys()).forEach((key) => {
      if (key === 'count') {
        params[key] = parseInt(searchParams.get(key) as string, 10);
      } else {
        params[key] = searchParams.get(key);
      }
    });
    if (params.count) {
      setParameters(params as ZalgoParameters);
    }
  }, [location]);

  useEffect(() => {
    setZalgoParams({
      maxAccentsUp: parameters.count,
      maxAccentsDown: parameters.count,
      maxAccentsMiddle: parameters.count,
      maxTotalAccents: parameters.count,
    });
    generateZalgo();
  }, [plaintext, parameters.count]);

  const copyZalgo = () => {
    navigator.clipboard.writeText(zalgo);
    setCopied({ ...copied, zalgo: true });
    setTimeout(() => {
      setCopied({ ...copied, zalgo: false });
    }, 3000);
  };

  const generateZalgo = async () => {
    setZalgo(zalgofy(plaintext, zalgoParams));
  };

  return (
    <div className={classList([baseClass])}>
      <Form
        className="input"
        onChange={(event) => {
          const form = event.currentTarget;
          setTimeout(() => {
            submit(form);
          }, 200);
        }}
      >
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

        <div className="input-group">
          <label htmlFor="level">Insanity level</label>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            name="count"
            id="count"
            value={parameters.count}
            onChange={(e) =>
              setParameters({
                ...parameters,
                count: parseInt(e.target.value, 10),
              })
            }
            onInput={(e) =>
              setParameters({
                ...parameters,
                count: parseInt((e.target as HTMLInputElement).value, 10),
              })
            }
          />
        </div>
      </Form>
      <div className="preview">{zalgo}</div>
      <div className="actions">
        <ul>
          <li>
            <Button
              onClick={() => {
                copyZalgo();
              }}
              icon={copied.zalgo ? <ClipboardCheck /> : <Clipboard />}
            >
              Copy
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                generateZalgo();
              }}
              icon={<ArrowClockwise />}
            >
              Regenerate
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
