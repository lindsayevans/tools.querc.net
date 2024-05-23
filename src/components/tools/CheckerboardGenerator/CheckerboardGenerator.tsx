import React, { useEffect, useState } from 'react';

import { classList } from '../../classList';

import './CheckerboardGenerator.scss';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { Button } from '../../ui/Button';
import {
  Clipboard,
  ClipboardCheck,
  FiletypePng,
  FiletypeSvg,
} from 'react-bootstrap-icons';
import { ColourPicker } from '../../ui/ColourPicker';

const baseClass = 'checkerboard-generator';

export type CheckerboardParameters = {
  background: string;
  foreground: string;
  size: number;
};

const defaultParameters: CheckerboardParameters = {
  //   background: '#ccc',
  background: '#ff0000cc',
  foreground: 'rebeccapurple',
  size: 10,
};

export const CheckerboardGenerator = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [parameters, setParameters] =
    useState<CheckerboardParameters>(defaultParameters);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params: Partial<CheckerboardParameters> = {};
    Array.from(searchParams.keys()).forEach((key) => {
      params[key] = searchParams.get(key);
    });
    if (params.background && params.foreground && params.size) {
      setParameters(params as CheckerboardParameters);
    }
  }, [location]);

  const getStyle = () => {
    return {
      background: `${parameters.background} repeating-conic-gradient(${
        parameters.foreground
      } 0% 25%, transparent 25% 50%) 0 0/${parameters.size * 2}px ${
        parameters.size * 2
      }px`,
    };
  };

  const getCss = () => {
    return `background: ${parameters.background} repeating-conic-gradient(${
      parameters.foreground
    } 0% 25%, transparent 25% 50%) 0 0/${parameters.size * 2}px ${
      parameters.size * 2
    }px`;
  };

  const getSvg = () => {
    return `<svg width="${parameters.size * 2}" height="${
      parameters.size * 2
    }" viewBox="0 0 ${parameters.size * 2} ${
      parameters.size * 2
    }" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${parameters.size * 2}" height="${
      parameters.size * 2
    }" fill="${parameters.background}"/>
    <rect x="${parameters.size}" y="0" width="${parameters.size}" height="${
      parameters.size
    }" fill="${parameters.foreground}"/>
    <rect x="0" y="${parameters.size}" width="${parameters.size}" height="${
      parameters.size
    }" fill="${parameters.foreground}"/>
    </svg>
    `;
  };

  const getPng = async (): Promise<string> => {
    return new Promise((resolve) => {
      const svg = getSvg();
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = parameters.size * 2;
      canvas.height = parameters.size * 2;

      if (ctx) {
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
      }
    });
  };

  const copyCss = () => {
    const code = getCss();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const downloadSvg = () => {
    downloadFile({
      name: 'checkerboard.svg',
      type: 'image/svg+xml',
      content: btoa(getSvg()),
    });
  };

  const downloadPng = async () => {
    const png = await getPng();
    downloadFile({
      name: 'checkerboard.png',
      dataUrl: png,
    });
  };

  const downloadFile = (props: {
    name: string;
    dataUrl?: string;
    type?: string;
    content?: string;
  }) => {
    const $link = document.createElement('a');
    const dataUrl =
      props.dataUrl || `data:${props.type};base64,${props.content}`;
    $link.setAttribute('download', props.name);
    $link.setAttribute('href', dataUrl);
    $link.click();
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
          <label htmlFor="background">Background</label>
          <ColourPicker
            name="background"
            id="background"
            value={parameters.background}
            onChange={(colour) =>
              setParameters({ ...parameters, background: colour })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="foreground">Foreground</label>
          <ColourPicker
            name="foreground"
            id="foreground"
            value={parameters.foreground}
            onChange={(colour) =>
              setParameters({ ...parameters, foreground: colour })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="size">Size</label>
          <input
            type="number"
            min={1}
            step={1}
            name="size"
            id="size"
            value={parameters.size}
            onChange={(e) =>
              setParameters({
                ...parameters,
                size: parseInt(e.target.value, 10),
              })
            }
            onInput={(e) =>
              setParameters({
                ...parameters,
                size: parseInt((e.target as HTMLInputElement).value, 10),
              })
            }
          />
        </div>
      </Form>
      <div className="preview">
        <div className="preview-image" style={getStyle()}></div>
      </div>
      <div className="download">
        <ul>
          <li>
            <Button
              onClick={() => {
                copyCss();
              }}
              icon={copied ? <ClipboardCheck /> : <Clipboard />}
            >
              Copy CSS
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                downloadSvg();
              }}
              icon={<FiletypeSvg />}
            >
              Download SVG
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                downloadPng();
              }}
              icon={<FiletypePng />}
            >
              Download PNG
            </Button>
          </li>
        </ul>
      </div>
      <pre className="preview-css">{getCss()}</pre>
      {/* <pre className="preview-css">{getSvg()}</pre>
      <div dangerouslySetInnerHTML={{ __html: getSvg() }}></div> */}
    </div>
  );
};
