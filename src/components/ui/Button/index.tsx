import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';

import { classList } from '../../classList';

import './Button.scss';

export type ButtonProps = {
  type?: 'button' | 'reset';
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    type = 'button',
    className,
    icon,
    iconPosition = 'right',
    children,
    onClick,
  } = props;

  return (
    <button
      className={classList(['btn', className])}
      type={type}
      onClick={onClick}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
};
