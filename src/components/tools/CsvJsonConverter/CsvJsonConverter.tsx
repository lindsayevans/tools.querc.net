import React, { useState } from 'react';
import Papa from 'papaparse';

import './CsvJsonConverter.scss';

export const CsvJsonConverter = () => {
  const [csv, setCsv] = useState<string>(`Name,Email
Emily Johnson,emily.johnson@example.com
Michael Smith,michael.smith@example.com
Sarah Brown,sarah.brown@example.com`);
  const [json, setJson] = useState<string>(`[
    {
        "Name": "John Davis",
        "Email": "john.davis@example.com"
    },
    {
        "Name": "Anna Lee",
        "Email": "anna.lee@example.com"
    },
    {
        "Name": "Robert Wilson",
        "Email": "robert.wilson@example.com"
    }
]`);
  const [hasHeaderRow, setHasHeaderRow] = useState(true);

  const convertTo = () => {
    if (csv) {
      const parsed = Papa.parse(csv, {
        header: hasHeaderRow,
      });
      setJson(JSON.stringify(parsed.data, null, 4));
    }
  };

  const convertFrom = () => {
    if (json) {
      const parsed = Papa.unparse(JSON.parse(json), {
        header: hasHeaderRow,
      });
      setCsv(parsed);
    }
  };

  return (
    <>
      <fieldset className="options">
        <legend>Options</legend>
        <label htmlFor="hasHeaderRow">
          <input
            type="checkbox"
            id="hasHeaderRow"
            checked={hasHeaderRow}
            onChange={(e) => setHasHeaderRow(e.target.checked)}
          />{' '}
          Headers in first row
        </label>
      </fieldset>
      <div className="converters">
        <div className="field-group">
          <label htmlFor="csv">CSV</label>
          <textarea
            id="csv"
            className="textarea"
            value={csv}
            rows={15}
            onChange={(e) => setCsv(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
        <div className="buttons">
          <button type="button" onClick={() => convertTo()}>
            To JSON&nbsp;&raquo;
          </button>
          <button type="button" onClick={() => convertFrom()}>
            &laquo;&nbsp;To CSV
          </button>
        </div>
        <div className="field-group">
          <label htmlFor="json">JSON</label>
          <textarea
            id="json"
            className="textarea"
            value={json}
            rows={15}
            onChange={(e) => setJson(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </div>
      </div>
    </>
  );
};
