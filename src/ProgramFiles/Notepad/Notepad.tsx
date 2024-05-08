import React, { useEffect, useState } from 'react';
import { Application } from '../../windows/system32';

import './Notepad.scss';
import { classList } from '../../components/classList';

export const Notepad = () => {
  const [wordWrap, setWordWrap] = useState(true);
  const [fileContent, setFileContent] = useState<string>();

  useEffect(() => {
    const loadFileContent = async () => {
      const response = await fetch('/files/Windows7.txt');
      const content = await response.text();
      setFileContent(content);
    };
    loadFileContent();
  });

  return (
    <>
      <Application
        executableName="notepad.exe"
        iconSrc="/icons/notepad.ico"
        title="Untitled"
      >
        <ul role="menubar" className="can-hover">
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            Format
            <ul role="menu">
              <li role="menuitem">
                <input
                  type="checkbox"
                  id="menuItemWordWrap"
                  checked={wordWrap}
                  onChange={() => {
                    setWordWrap(!wordWrap);
                  }}
                />
                <label htmlFor="menuItemWordWrap">Word wrap</label>
              </li>
            </ul>
          </li>
          {/* <li role="menuitem" tabIndex={0} aria-haspopup="true">
            File
            <ul role="menu">
              <li role="menuitem">
                <a href="#menubar">
                  Open <span>Ctrl+O</span>
                </a>
              </li>
              <li role="menuitem">
                <a href="#menubar">
                  Save <span>Ctrl+S</span>
                </a>
              </li>
              <li role="menuitem" className="has-divider">
                <a href="#menubar">
                  Save As... <span>Ctrl+Shift+S</span>
                </a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Exit</a>
              </li>
            </ul>
          </li>
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            Edit
            <ul role="menu">
              <li role="menuitem">
                <a href="#menubar">Undo</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Copy</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Cut</a>
              </li>
              <li role="menuitem" className="has-divider">
                <a href="#menubar">Paste</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Delete</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Find...</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Replace...</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">Go to...</a>
              </li>
            </ul>
          </li>
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            View
            <ul role="menu">
              <li role="menuitem" tabIndex={0} aria-haspopup="true">
                Zoom
                <ul role="menu">
                  <li role="menuitem">
                    <button>Zoom In</button>
                  </li>
                  <li role="menuitem">
                    <button>Zoom Out</button>
                  </li>
                </ul>
              </li>
              <li role="menuitem">
                <a href="#menubar">Status Bar</a>
              </li>
            </ul>
          </li>
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            Help
            <ul role="menu">
              <li role="menuitem">
                <a href="#menubar">View Help</a>
              </li>
              <li role="menuitem">
                <a href="#menubar">About</a>
              </li>
            </ul>
          </li> */}
        </ul>
        <textarea
          className={classList([
            'notepad__textarea has-scrollbar',
            wordWrap ? 'word-wrap' : undefined,
          ])}
          defaultValue={fileContent}
        ></textarea>
      </Application>
    </>
  );
};
