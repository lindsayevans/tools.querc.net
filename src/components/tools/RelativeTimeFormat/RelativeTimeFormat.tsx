import React, { useEffect, useState } from 'react';
import { BCP_47 } from '../shared/Intl';

import './RelativeTimeFormat.scss';
import { classList } from '../../classList';

type RelativeTimeFormatParams = {
  locale: string;
  options: Intl.RelativeTimeFormatOptions;
};

type RelativeTimeFormatUnits =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

export const RelativeTimeFormat = () => {
  const locales = BCP_47;

  const supportedOptions = {
    localematcher: ['best fit', 'lookup'],
    numberingSystem: (Intl as any).supportedValuesOf('numberingSystem'),
    style: ['long', 'short', 'narrow'],
    numeric: ['always', 'auto'],
  };

  const supportedUnits: RelativeTimeFormatUnits[] = [
    'year',
    'quarter',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
  ];

  const defaultParams: RelativeTimeFormatParams = {
    locale: 'en-AU',
    options: {
      style: 'narrow',
      numeric: 'auto',
    },
  };

  const [parameters, setParameters] =
    useState<RelativeTimeFormatParams>(defaultParams);
  const [value, setValue] = useState<number>(28);
  const [unit, setUnit] = useState<RelativeTimeFormatUnits>('day');
  const [formattedValue, setFormattedValue] = useState<string>();
  const [availableOptions, setAvailableOptions] = useState<string[]>(
    Object.keys(supportedOptions)
      .filter((x) => !Object.keys(defaultParams.options).includes(x))
      .sort()
  );
  const [copied, setCopied] = useState(false);

  const formatValue = (value: number, unit: RelativeTimeFormatUnits) => {
    const formatted = new Intl.RelativeTimeFormat(
      parameters.locale,
      parameters.options
    ).format(value, unit);

    return formatted;
  };

  const removeOption = (option: string) => {
    setParameters({
      ...parameters,
      options: { ...parameters.options, [option]: undefined },
    });
  };

  const addOption = (option: string) => {
    setParameters({
      ...parameters,
      options: { ...parameters.options, [option]: supportedOptions[option][0] },
    });
  };

  const copyCode = () => {
    const code = `new Intl.RelativeTimeFormat('${parameters.locale}', {
${Object.keys(parameters.options)
  .filter((option) => parameters.options[option] !== undefined)
  .map((option) => {
    return `  ${option}: ${option === 'hour12' ? '' : "'"}${
      parameters.options[option]
    }${option === 'hour12' ? '' : "'"},`;
  })
  .join('\r\n')}
}).format(${value}, '${unit}')`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    try {
      setFormattedValue(formatValue(value, unit));
    } catch (e) {}

    setAvailableOptions(
      Object.keys(supportedOptions)
        .filter(
          (x) =>
            !Object.keys(parameters.options).includes(x) ||
            parameters.options[x] === undefined
        )
        .sort()
    );
  }, [value, unit, parameters]);

  return (
    <>
      <div className="playground">
        <div className="input">
          <button
            type="button"
            className={classList([
              'copy-button',
              copied ? 'copied' : undefined,
            ])}
            onClick={() => copyCode()}
          >
            Copy code
          </button>
          <label htmlFor="locale">
            <span className="sh-keyword">new</span> Intl.
            <span className="sh-property">RelativeTimeFormat</span>(
            <span className="sh-string">'</span>
          </label>
          <input
            type="search"
            id="locale"
            className="locale"
            value={parameters?.locale}
            onChange={(e) =>
              setParameters({ ...parameters, locale: e.target.value })
            }
            size={9}
            list="localeList"
          />
          <datalist id="localeList">
            {locales.map((x) => (
              <option key={x} value={x} />
            ))}
          </datalist>
          <span className="sh-string">'</span>, &#123;
          <div>
            {parameters.options &&
              Object.keys(parameters.options).map(
                (option) =>
                  parameters.options[option] !== undefined && (
                    <div className="option" key={option}>
                      <label htmlFor={option}>{option}:</label>{' '}
                      <span className="sh-string">'</span>
                      <select
                        id={option}
                        value={parameters?.options[option]}
                        onChange={(e) =>
                          setParameters({
                            ...parameters,
                            options: {
                              ...parameters.options,
                              [option]: e.target.value,
                            },
                          })
                        }
                      >
                        {supportedOptions[option] &&
                          supportedOptions[option].map((value) => (
                            <option key={value.toString()}>{value}</option>
                          ))}
                      </select>
                      <span className="sh-string">'</span>,
                      <button
                        type="button"
                        className="remove"
                        onClick={() => removeOption(option)}
                        title="Remove option"
                      >
                        ❌
                      </button>
                    </div>
                  )
              )}
            <button type="button" className="add" title="Add option">
              ➕
              <select
                onChange={(e) => {
                  if (e.target.value !== '') {
                    addOption(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Add an option:</option>
                {availableOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </button>
          </div>
          <label htmlFor="value">
            &#125;).<span className="sh-property">format</span>(
          </label>
          <input
            type="number"
            id="value"
            className="value-input"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
            onInput={(e) =>
              setValue(parseInt((e.target as HTMLInputElement).value, 10))
            }
          />
          ,<span className="sh-string">'</span>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as RelativeTimeFormatUnits)}
          >
            {supportedUnits.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <span className="sh-string">'</span>)
        </div>

        <pre className="output">{formattedValue}</pre>
      </div>
    </>
  );
};
