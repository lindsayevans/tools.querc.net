import React, { useEffect, useState } from 'react';

import { classList } from '../../classList';

import './LoremIpsumGenerator.scss';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Clipboard, ClipboardCheck } from 'react-bootstrap-icons';
import { LOREM_IPSUM_VARIANTS } from './LOREM_IPSUM_VARIANTS';

const baseClass = 'lorem-ipsum-generator';

export type LoremIpsumParameters = {
  variant: (typeof LOREM_IPSUM_VARIANTS)[number];
  paragraphs: number;
};

const defaultParameters: LoremIpsumParameters = {
  variant: LOREM_IPSUM_VARIANTS[0],
  paragraphs: 5,
};

export const LoremIpsumGenerator = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [parameters, setParameters] =
    useState<LoremIpsumParameters>(defaultParameters);
  const [copied, setCopied] = useState({ text: false, html: false });

  useEffect(() => {
    const params: Partial<LoremIpsumParameters> = {};
    Array.from(searchParams.keys()).forEach((key) => {
      if (key === 'variant') {
        params[key] =
          LOREM_IPSUM_VARIANTS[parseInt(searchParams.get(key) as string, 10)];
      } else if (key === 'paragraphs') {
        params[key] = parseInt(searchParams.get(key) as string, 10);
      } else {
        params[key] = searchParams.get(key);
      }
    });
    if (params.variant || params.paragraphs) {
      setParameters(params as LoremIpsumParameters);
    }
  }, [location]);

  const copyText = () => {
    const code = parameters.variant.lines
      .filter((_, i) => i < parameters.paragraphs)
      .map((line) => line)
      .join('\r\n\r\n');
    navigator.clipboard.writeText(code);
    setCopied({ ...copied, text: true });
    setTimeout(() => {
      setCopied({ ...copied, text: false });
    }, 3000);
  };

  const copyHtml = () => {
    const code = `<p>${parameters.variant.lines
      .filter((_, i) => i < parameters.paragraphs)
      .map((line) => line)
      .join('</p>\r\n<p>')}</p>`;
    navigator.clipboard.writeText(code);
    setCopied({ ...copied, html: true });
    setTimeout(() => {
      setCopied({ ...copied, html: false });
    }, 3000);
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
        <div className="input-group">
          <label htmlFor="variant">Variant</label>
          <select
            name="variant"
            id="variant"
            onChange={(e) =>
              setParameters({
                ...parameters,
                variant: LOREM_IPSUM_VARIANTS[e.target.selectedIndex],
              })
            }
          >
            {LOREM_IPSUM_VARIANTS.map((variant, i) => (
              <option
                value={i}
                selected={parameters.variant.name === variant.name}
              >
                {variant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="paragraphs">Paragraphs</label>
          <input
            type="number"
            min={1}
            max={7}
            step={1}
            name="paragraphs"
            id="paragraphs"
            value={parameters.paragraphs}
            onChange={(e) =>
              setParameters({
                ...parameters,
                paragraphs: parseInt(e.target.value, 10),
              })
            }
            onInput={(e) =>
              setParameters({
                ...parameters,
                paragraphs: parseInt((e.target as HTMLInputElement).value, 10),
              })
            }
          />
        </div>
      </Form>
      <div className="preview">
        {parameters.variant.lines
          .filter((_, i) => i < parameters.paragraphs)
          .map((line) => (
            <p>{line}</p>
          ))}
      </div>
      <div className="actions">
        <ul>
          <li>
            <Button
              onClick={() => {
                copyHtml();
              }}
              icon={copied.html ? <ClipboardCheck /> : <Clipboard />}
            >
              Copy HTML
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                copyText();
              }}
              icon={copied.text ? <ClipboardCheck /> : <Clipboard />}
            >
              Copy text
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
