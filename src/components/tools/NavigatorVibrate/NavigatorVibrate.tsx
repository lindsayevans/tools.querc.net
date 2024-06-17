import React, { useEffect, useState } from 'react';

import './NavigatorVibrate.scss';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Clipboard, ClipboardCheck, PhoneVibrate } from 'react-bootstrap-icons';
import TextareaAutosize from 'react-textarea-autosize';

type NavigatorVibrateParams = {
  pattern: string;
};

export const NavigatorVibrate = () => {
  const defaultParams: NavigatorVibrateParams = {
    pattern:
      '100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100',
  };

  const [parameters, setParameters] =
    useState<NavigatorVibrateParams>(defaultParams);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const code = `navigator.vibrate([${parameters.pattern}])`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const reset = () => {
    setParameters(defaultParams);
  };

  const submit = useSubmit();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    const params: NavigatorVibrateParams = {
      pattern: searchParams.get('pattern') || '',
    };
    if (params.pattern !== '') {
      setParameters(params);
    }
  }, [location]);

  const test = () => {
    const values = parameters.pattern
      .split(',')
      .map((x) => parseInt(x.trim(), 10));
    if (values) {
      navigator.vibrate(values);
    }
  };

  return (
    <>
      <div className="playground">
        <Form
          onChange={(event) => {
            const form = event.currentTarget;
            setTimeout(() => {
              submit(form);
            }, 200);
          }}
          className="input"
        >
          <div className="form-actions">
            <Button
              onClick={() => copyCode()}
              icon={copied ? <ClipboardCheck /> : <Clipboard />}
            >
              Copy code
            </Button>
            <Button onClick={() => test()} icon={<PhoneVibrate />}>
              Test
            </Button>
            <Button onClick={() => reset()}>Reset</Button>
          </div>
          <label htmlFor="pattern">
            navigator.
            <span className="sh-property">vibrate</span>([
          </label>
          <TextareaAutosize
            id="pattern"
            name="pattern"
            className="pattern"
            value={parameters?.pattern}
            minRows={1}
            onChange={(e) =>
              setParameters({ ...parameters, pattern: e.target.value })
            }
          />
          ])
        </Form>
      </div>
    </>
  );
};
