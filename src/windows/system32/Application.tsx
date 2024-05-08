import React, { PropsWithChildren, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

import { classList } from '../../components/classList';

import './Application.scss';
import 'react-resizable/css/styles.css';

export type ApplicationProps = {
  executableName: string;
  title: string;
  iconSrc?: string;
  iconTitle?: string;
  width?: number;
  height?: number;
  draggable?: boolean;
  resizable?: boolean;
};

export const Application: React.FC<PropsWithChildren<ApplicationProps>> = (
  props
) => {
  const {
    children,
    executableName,
    title,
    iconSrc = '/icons/exe.ico',
    iconTitle = executableName,
    width = 300,
    height = 300,
    draggable = true,
    resizable = true,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isMaximised, setIsMaximised] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  return (
    <div className="application-wrapper">
      <Draggable>
        <div className="app-icon" onClick={() => setIsOpen(true)}>
          <img src={iconSrc} />
          <span className="app-icon__title">{iconTitle}</span>
        </div>
      </Draggable>
      <Draggable
        disabled={!draggable}
        allowAnyClick
        handle=".title-bar"
        cancel=".title-bar-controls"
      >
        <ResizableBox
          className={classList([
            'application',
            isOpen ? 'open' : 'closed',
            isMinimised ? 'minimised' : undefined,
            isMaximised ? 'maximised' : undefined,
          ])}
          width={width}
          height={height}
          minConstraints={[200, 100]}
          maxConstraints={[1000, 1000]}
          resizeHandles={
            resizable ? ['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's'] : []
          }
        >
          <div
            className={classList([
              'window glass',
              isOpen ? 'open' : undefined,
              isFocused ? 'active' : undefined,
            ])}
          >
            <div
              className="title-bar"
              onDoubleClick={() => setIsMaximised(!isMaximised)}
            >
              <div className="title-bar-text">{title}</div>
              <div className="title-bar-controls">
                {isMinimised && (
                  <button
                    aria-label="Restore"
                    onClick={() => setIsMinimised(false)}
                  ></button>
                )}
                {!isMinimised && (
                  <button
                    aria-label="Minimize"
                    onClick={() => setIsMinimised(true)}
                  ></button>
                )}
                {isMaximised && (
                  <button
                    aria-label="Restore"
                    onClick={() => setIsMaximised(false)}
                  ></button>
                )}
                {!isMaximised && (
                  <button
                    aria-label="Maximize"
                    onClick={() => setIsMaximised(true)}
                  ></button>
                )}
                <button
                  aria-label="Close"
                  onClick={() => setIsOpen(!isOpen)}
                ></button>
              </div>
            </div>
            <div className="window-body  has-scrollbar">{children}</div>
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  );
};
