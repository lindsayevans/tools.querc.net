import React, { useState } from 'react';
import { Application } from '../../windows/system32';

import './ViewSource.scss';

export const ViewSource = () => {
  const [url, setUrl] = useState<string>('https://boomworks.com.au/');

  const viewSource = () => {
    // Doesn't work :(
    window.open(`view-source:${url}`, '_blank');
  };

  return (
    <>
      <Application
        executableName="ViewSource.exe"
        iconSrc="/icons/ViewSource.ico"
        title="View Source"
        width={600}
        height={110}
      >
        <div className="form">
          <div className="field-row-stacked">
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button type="button" onClick={() => viewSource()}>
            View source
          </button>
        </div>
      </Application>
    </>
  );
};
