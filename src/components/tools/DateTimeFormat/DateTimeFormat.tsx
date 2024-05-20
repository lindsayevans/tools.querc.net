import React, { useEffect, useState } from 'react';
import { BCP_47, SUPPORTED_TIME_ZONES } from '../shared/Intl';

import './DateTimeFormat.scss';
import { classList } from '../../classList';
import { formatOptions } from '../shared/formatOptions';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';

type DateTimeFormatParams = {
  locale: string;
  options: Intl.DateTimeFormatOptions;
};

export const DateTimeFormat = () => {
  const locales = BCP_47;

  const supportedOptions = {
    calendar: (Intl as any).supportedValuesOf('calendar'),
    dayPeriod: ['narrow', 'short', 'long'],
    numberingSystem: (Intl as any).supportedValuesOf('numberingSystem'),
    dateStyle: ['full', 'long', 'medium', 'short'],
    timeStyle: ['full', 'long', 'medium', 'short'],
    hourCycle: ['h11', 'h12', 'h23', 'h24'],
    localeMatcher: ['best fit', 'lookup'],
    weekday: ['long', 'short', 'narrow'],
    era: ['long', 'short', 'narrow'],
    year: ['numeric', '2-digit'],
    month: ['numeric', '2-digit', 'long', 'short', 'narrow'],
    day: ['numeric', '2-digit'],
    hour: ['numeric', '2-digit'],
    minute: ['numeric', '2-digit'],
    second: ['numeric', '2-digit'],
    timeZoneName: [
      'short',
      'long',
      'shortOffset',
      'longOffset',
      'shortGeneric',
      'longGeneric',
    ],
    formatMatcher: ['best fit', 'basic'],
    hour12: [true, false],
    timeZone: SUPPORTED_TIME_ZONES,
  };

  const defaultParams: DateTimeFormatParams = {
    locale: 'en-AU',
    options: {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Australia/Sydney',
      hour12: true,
    },
  };

  const [parameters, setParameters] =
    useState<DateTimeFormatParams>(defaultParams);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState<string>();
  const [availableOptions, setAvailableOptions] = useState<string[]>(
    Object.keys(supportedOptions)
      .filter((x) => !Object.keys(defaultParams.options).includes(x))
      .sort()
  );
  const [copied, setCopied] = useState(false);

  const formatDate = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat(
      parameters.locale,
      parameters.options
    ).format(date);

    return formattedDate;
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

  const getDateValue = (date: Date) => {
    const newDate = new Date(date.getTime());
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate.toISOString().slice(0, 16);
  };

  const copyCode = () => {
    const code = `new Intl.DateTimeFormat('${
      parameters.locale
    }', ${formatOptions(parameters.options)}).format(new Date())`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const reset = () => {
    setDate(new Date());
    setParameters(defaultParams);
  };

  const submit = useSubmit();

  useEffect(() => {
    try {
      setFormattedDate(formatDate(date));
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
  }, [date, parameters]);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    if (searchParams.get('date')) {
      setDate(new Date(searchParams.get('date') as string));
    }

    const params: DateTimeFormatParams = {
      locale: searchParams.get('locale') || '',
      options: {},
    };
    Array.from(searchParams.keys())
      .filter((x) => !['locale', 'date'].includes(x))
      .forEach((key) => {
        params.options[key] = searchParams.get(key);
      });
    if (params.locale !== '' || Object.keys(params.options).length > 0) {
      setParameters(params);
    }
  }, [location]);

  return (
    <>
      <div className="playground">
        <Form
          onChange={(event) => {
            submit(event.currentTarget);
          }}
          className="input"
        >
          <div className="form-actions">
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
            <button
              type="button"
              className={classList(['reset-button'])}
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
          <label htmlFor="locale">
            <span className="sh-keyword">new</span> Intl.
            <span className="sh-property">DateTimeFormat</span>(
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
                      {option !== 'hour12' && (
                        <span className="sh-string">'</span>
                      )}
                      {option !== 'timeZone' && (
                        <select
                          id={option}
                          name={option}
                          value={parameters?.options[option]}
                          onChange={(e) =>
                            setParameters({
                              ...parameters,
                              options: {
                                ...parameters.options,
                                [option]:
                                  option === 'hour12'
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
                                {option === 'hour12' ? value.toString() : value}
                              </option>
                            ))}
                        </select>
                      )}
                      {option === 'timeZone' && (
                        <>
                          <input
                            type="search"
                            id="timeZone"
                            name="timeZone"
                            value={parameters?.options.timeZone}
                            onChange={(e) =>
                              setParameters({
                                ...parameters,
                                options: {
                                  ...parameters.options,
                                  timeZone: e.target.value,
                                },
                              })
                            }
                            list="timeZoneList"
                          />
                          <datalist id="timeZoneList">
                            {SUPPORTED_TIME_ZONES.map((x) => (
                              <option key={x} value={x} />
                            ))}
                          </datalist>
                        </>
                      )}
                      {option !== 'hour12' && (
                        <span className="sh-string">'</span>
                      )}
                      ,
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
          <label htmlFor="date">
            &#125;).<span className="sh-property">format</span>(
          </label>
          <span className="date-picker">
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={getDateValue(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
              onInput={(e) =>
                setDate(new Date((e.target as HTMLInputElement).value))
              }
            />
          </span>
          )
        </Form>

        <pre className="output">{formattedDate}</pre>
      </div>
    </>
  );
};
