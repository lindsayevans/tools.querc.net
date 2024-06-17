import React, { useEffect, useState } from 'react';

import { classList } from '../../classList';

import './UuidGenerator.scss';
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
import {
  NIL as NIL_UUID,
  MAX as MAX_UUID,
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v7 as uuidv7,
} from 'uuid';

const baseClass = 'uuid-generator';

const uuidTypes = [
  { name: 'NIL', type: 'nil' },
  { name: 'MAX', type: 'max' },
  { name: 'UUID v1', type: 'uuid-v1' },
  { name: 'UUID v3', type: 'uuid-v3' },
  { name: 'UUID v4', type: 'uuid-v4' },
  { name: 'UUID v5', type: 'uuid-v5' },
  { name: 'UUID v6', type: 'uuid-v6' },
  { name: 'UUID v7', type: 'uuid-v7' },
];

export type UuidParameters = {
  type: (typeof uuidTypes)[number]['type'];
  count: number;
};

const defaultParameters: UuidParameters = {
  type: 'uuid-v7',
  count: 1,
};

export const UuidGenerator = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [parameters, setParameters] =
    useState<UuidParameters>(defaultParameters);
  const [copied, setCopied] = useState({ uuid: false });
  const [uuids, setUuids] = useState<string[]>([]);

  useEffect(() => {
    const params: Partial<UuidParameters> = {};
    Array.from(searchParams.keys()).forEach((key) => {
      if (key === 'count') {
        params[key] = parseInt(searchParams.get(key) as string, 10);
      } else {
        params[key] = searchParams.get(key);
      }
    });
    if (params.type || params.count) {
      setParameters(params as UuidParameters);
    }
  }, [location]);

  useEffect(() => {
    generateUUIDs();
  }, [parameters.count, parameters.type]);

  const copyUUIDs = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied({ ...copied, uuid: true });
    setTimeout(() => {
      setCopied({ ...copied, uuid: false });
    }, 3000);
  };

  const sleep = (m) => new Promise((r) => setTimeout(r, m));

  const getUUID = (type: (typeof uuidTypes)[number]['type']) => {
    switch (type) {
      case 'nil':
        return NIL_UUID;
      case 'max':
        return MAX_UUID;
      case 'uuid-v1':
        return uuidv1();
      case 'uuid-v3':
        return uuidv3('tools.querc.net', uuidv3.DNS);
      case 'uuid-v4':
        return uuidv4();
      case 'uuid-v5':
        return uuidv5('tools.querc.net', uuidv5.DNS);
      case 'uuid-v6':
        return uuidv6();
      case 'uuid-v7':
        return uuidv7();
      default:
        return NIL_UUID;
    }
  };

  const generateUUIDs = async () => {
    const uuids = new Array(parameters.count).fill(1);
    for (const i in uuids) {
      await sleep(123);
      uuids[i] = getUUID(parameters.type);
    }

    setUuids(uuids);
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
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={parameters.type}
            onChange={(e) =>
              setParameters({
                ...parameters,
                type: e.target.value,
              })
            }
          >
            {uuidTypes.map((type, i) => (
              <option value={type.type} key={type.type}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="count">Count</label>
          <input
            type="number"
            min={1}
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
      <div className="preview">
        {uuids.map((uuid, i) => (
          <pre key={uuid + i}>{uuid}</pre>
        ))}
      </div>
      <div className="actions">
        <ul>
          <li>
            <Button
              onClick={() => {
                copyUUIDs();
              }}
              icon={copied.uuid ? <ClipboardCheck /> : <Clipboard />}
            >
              Copy
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                generateUUIDs();
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
