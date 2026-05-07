import React, { useState, ReactNode } from 'react';
import '../styles/Tabs.css';

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabsList = React.Children.toArray(children).find(
    (child: any) => child?.type?.name === 'TabsList'
  );
  const tabsContent = React.Children.toArray(children).filter(
    (child: any) => child?.type?.name === 'TabsContent'
  );

  return (
    <div className="tabs">
      {tabsList}
      <div className="tabs-content">
        {React.Children.toArray(tabsContent).map((content: any) =>
          content?.props?.value === activeTab ? (
            <div key={content?.props?.value} className="tab-pane">
              {content?.props?.children}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

interface TabsListProps {
  children: ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ children }) => (
  <div className="tabs-list">{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => (
  <button className="tab-trigger" data-value={value}>
    {children}
  </button>
);

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => (
  <div className="tab-content">{children}</div>
);

export { Tabs, TabsList, TabsTrigger, TabsContent };