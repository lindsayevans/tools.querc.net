import React, {
  Children,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import { classList } from '../../classList';

import './Tabs.scss';
import { useLocation } from 'react-router-dom';

export type TabsProps = {
  className?: string;
};

export const Tabs: React.FC<PropsWithChildren<TabsProps>> = (props) => {
  const { className, children } = props;

  const [currentTab, setCurrentTab] = useState<string>();
  const [tabs, setTabs] = useState<any>([]);

  useEffect(() => {
    setTabs(
      Children.map(children, (child, i) => {
        const title: string = (child as unknown as any).props.title;
        const name = title.replace(' ', '-').toLowerCase();
        const id = `tab-${name}`;

        if (!currentTab && i === 0) {
          setCurrentTab(name);
        }

        return {
          title,
          id,
          name,
          tab: child,
        };
      })
    );
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.hash && location.hash.includes('tab-')) {
      const tab = location.hash.replace('#', '').replace('tab-', '');
      if (tab !== currentTab) {
        setCurrentTab(tab);
      }
    }
  }, [location]);

  return (
    <div className={classList(['tabs', className])}>
      <ul className="tab-buttons">
        {tabs &&
          tabs.map((tab) => (
            <li
              key={tab.title}
              className={classList([
                'tab-button',
                currentTab === tab.name ? 'tab-button--active' : '',
              ])}
            >
              <a href={`#${tab.id}`} onClick={() => setCurrentTab(tab.name)}>
                {tab.title}
              </a>
            </li>
          ))}
      </ul>
      {tabs &&
        tabs.map((tab) => {
          return (
            <div
              id={tab.id}
              className={classList([
                'tab-content',
                currentTab === tab.name ? 'tab-content--active' : '',
              ])}
            >
              {tab.tab}
            </div>
          );
        })}
    </div>
  );
};
