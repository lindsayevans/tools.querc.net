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
};

const defaultParameters: LoremIpsumParameters = {
  variant: LOREM_IPSUM_VARIANTS[0],
};

export const LoremIpsumGenerator = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [parameters, setParameters] =
    useState<LoremIpsumParameters>(defaultParameters);
  const [copied, setCopied] = useState({ text: false, html: false });

  useEffect(() => {
    if (searchParams.has('variant')) {
      const variant = searchParams.get('variant');
      if (variant) {
        setParameters({
          ...parameters,
          variant:
            LOREM_IPSUM_VARIANTS[
              parseInt(searchParams.get('variant') as string, 10)
            ],
        });
      }
    }
  }, [location]);

  const copyText = () => {
    const code = parameters.variant.lines.map((line) => line).join('\r\n\r\n');
    navigator.clipboard.writeText(code);
    setCopied({ ...copied, text: true });
    setTimeout(() => {
      setCopied({ ...copied, text: false });
    }, 3000);
  };

  const copyHtml = () => {
    const code = `<p>${parameters.variant.lines
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
      </Form>
      <div className="preview">
        {parameters.variant.lines.map((line) => (
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
