import React, { PropsWithChildren } from 'react';

import { classList } from '../../classList';

export type TabProps = {
  title: string;
  className?: string;
};

export const Tab: React.FC<PropsWithChildren<TabProps>> = (props) => {
  const { title, className, children } = props;

  return <div className={classList(['tab', className])}>{children}</div>;
};
