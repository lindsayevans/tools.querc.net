/// <reference path="./Intl.DurationFormat.d.ts" />

import '@formatjs/intl-durationformat/polyfill';
import React, { useEffect, useState } from 'react';
import { classList } from '../../classList';
import { BCP_47 } from '../shared/Intl';
import { DurationInput } from './types';

import './DurationFormat.scss';
import { formatOptions } from '../shared/formatOptions';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import {
  ClipboardCheck,
  Clipboard,
  PlusCircle,
  XCircle,
  Trash3,
} from 'react-bootstrap-icons';
import { Button } from '../../ui/Button';

type DurationFormatParams = {
  locale: string;
  options: Intl.DurationFormatOptions;
};

export const DurationFormat = () => {
  const locales = BCP_47;

  const supportedOptions = {
    localeMatcher: ['best fit', 'lookup'],
    numberingSystem: (Intl as any).supportedValuesOf(
      'numberingSystem'
    ) as Intl.DurationFormatOptions['numberingSystem'][],
    style: ['long', 'short', 'narrow', 'digital'],
    years: ['long', 'short', 'narrow'],
    yearsDisplay: ['auto', 'always'],
    months: ['long', 'short', 'narrow'],
    monthsDisplay: ['auto', 'always'],
    weeks: ['long', 'short', 'narrow'],
    weeksDisplay: ['auto', 'always'],
    days: ['long', 'short', 'narrow'],
    daysDisplay: ['auto', 'always'],
    hours: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    hoursDisplay: ['auto', 'always'],
    minutes: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    minutesDisplay: ['auto', 'always'],
    seconds: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    secondsDisplay: ['auto', 'always'],
    milliseconds: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    millisecondsDisplay: ['auto', 'always'],
    microseconds: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    microsecondsDisplay: ['auto', 'always'],
    nanoseconds: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    nanosecondsDisplay: ['auto', 'always'],
    fractionalDigits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    round: [true, false],
  };

  const defaultParams: DurationFormatParams = {
    locale: 'es-MX',
    options: {
      style: 'short',
    },
  };

  const supportedDurationProps = [
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
    'microseconds',
    'nanoseconds',
  ];

  // 28 days, 6 hours, 42 minutes and 12 seconds.
  const defaultDuration: DurationInput = {
    days: 28,
    hours: 6,
    minutes: 42,
    seconds: 12,
  };

  const [parameters, setParameters] =
    useState<DurationFormatParams>(defaultParams);
  const [duration, setDuration] = useState<DurationInput>(defaultDuration);
  const [formattedDuration, setFormattedDuration] = useState<string>();
  const [availableOptions, setAvailableOptions] = useState<string[]>(
    Object.keys(supportedOptions)
      .filter((x) => !Object.keys(defaultParams.options).includes(x))
      .sort()
  );
  const [availableDurationProps, setAvailableDurationProps] = useState<
    string[]
  >(
    supportedDurationProps
      .filter((x) => !Object.keys(defaultDuration).includes(x))
      .sort()
  );
  const [copied, setCopied] = useState(false);

  const formatDuration = (duration: DurationInput) => {
    const formattedDuration = new Intl.DurationFormat(
      parameters.locale,
      parameters.options
    ).format(duration);

    return formattedDuration;
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

  const removeDurationProp = (option: string) => {
    setDuration({
      ...duration,
      [option]: undefined,
    });
  };

  const addDurationProp = (option: string) => {
    setDuration({
      ...duration,
      [option]: 1,
    });
  };

  const copyCode = () => {
    const code = `new Intl.DurationFormat('${
      parameters.locale
    }', ${formatOptions(parameters.options)}).format(${formatOptions(
      duration
    )})`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const reset = () => {
    setDuration(defaultDuration);
    setParameters(defaultParams);
  };

  const submit = useSubmit();

  useEffect(() => {
    try {
      setFormattedDuration(formatDuration(duration));
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
    setAvailableDurationProps(
      supportedDurationProps
        .filter((x) => !Object.keys(duration).includes(x))
        .sort()
    );
  }, [duration, parameters]);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    const params: DurationFormatParams = {
      locale: searchParams.get('locale') || '',
      options: {},
    };
    Array.from(searchParams.keys())
      .map((x) => x.replace('options.', ''))
      .filter((x) => !x.startsWith('duration.'))
      .filter((x) => Object.keys(supportedOptions).includes(x))
      .forEach((key) => {
        params.options[key] = searchParams.get('options.' + key);
      });
    if (params.locale !== '' || Object.keys(params.options).length > 0) {
      setParameters(params);
    }

    const duration: DurationInput = {};
    Array.from(searchParams.keys())
      .map((x) => x.replace('duration.', ''))
      .filter((x) => supportedDurationProps.includes(x))
      .forEach((key) => {
        duration[key] = searchParams.get('duration.' + key);
      });
    if (Object.keys(duration).length > 0) {
      setDuration(duration);
    }
  }, [location]);

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
            <Button onClick={() => reset()}>Reset</Button>
          </div>
          <label htmlFor="locale">
            <span className="sh-keyword">new</span> Intl.
            <span className="sh-property">DurationFormat</span>(
            <span className="sh-string">'</span>
          </label>
          <input
            type="search"
            id="locale"
            name="locale"
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
                      {option !== 'round' && option !== 'fractionalDigits' && (
                        <span className="sh-string">'</span>
                      )}
                      {option !== 'fractionalDigits' && (
                        <select
                          id={option}
                          name={`options.${option}`}
                          value={parameters?.options[option]}
                          onChange={(e) =>
                            setParameters({
                              ...parameters,
                              options: {
                                ...parameters.options,
                                [option]:
                                  option === 'round'
                                    ? e.target.value === 'true'
                                      ? true
                                      : false
                                    : e.target.value,
                              },
                            })
                          }
                        >
                          {supportedOptions[option] &&
                            supportedOptions[option].map((value) => (
                              <option key={value.toString()}>
                                {option === 'round' ? value.toString() : value}
                              </option>
                            ))}
                        </select>
                      )}
                      {option === 'fractionalDigits' && (
                        <>
                          <input
                            type="number"
                            id="fractionalDigits"
                            name="fractionalDigits"
                            min={0}
                            max={9}
                            step={1}
                            className="number-input"
                            value={parameters?.options.fractionalDigits}
                            onChange={(e) =>
                              setParameters({
                                ...parameters,
                                options: {
                                  ...parameters.options,
                                  fractionalDigits: parseInt(
                                    e.target.value,
                                    10
                                  ) as Intl.DurationFormatOptions['fractionalDigits'],
                                },
                              })
                            }
                          />
                        </>
                      )}
                      {option !== 'round' && option !== 'fractionalDigits' && (
                        <span className="sh-string">'</span>
                      )}
                      ,
                      <button
                        type="button"
                        className="remove"
                        onClick={() => removeOption(option)}
                        title="Remove option"
                      >
                        <Trash3 />
                      </button>
                    </div>
                  )
              )}
            {availableOptions.length > 0 && (
              <button type="button" className="add" title="Add option">
                <PlusCircle />
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
            )}
          </div>
          &#125;).<span className="sh-property">format</span>(&#123;
          <div>
            {duration &&
              Object.keys(duration).map(
                (prop) =>
                  duration[prop] !== undefined && (
                    <div className="option" key={prop}>
                      <label htmlFor={prop}>{prop}:</label>{' '}
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className="number-input"
                        id={prop}
                        name={`duration.${prop}`}
                        value={duration[prop]}
                        onChange={(e) =>
                          setDuration({
                            ...duration,
                            [prop]: parseInt(e.target.value, 10),
                          })
                        }
                      />
                      ,
                      <button
                        type="button"
                        className="remove"
                        onClick={() => removeDurationProp(prop)}
                        title="Remove duration value"
                      >
                        <Trash3 />
                      </button>
                    </div>
                  )
              )}
            {availableDurationProps.length > 0 && (
              <button type="button" className="add" title="Add duration value">
                <PlusCircle />
                <select
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      addDurationProp(e.target.value);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="">Add a duration value:</option>
                  {availableDurationProps.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </button>
            )}
          </div>
          &#125;)
        </Form>
        <pre className="output">{formattedDuration}</pre>
      </div>
    </>
  );
};
