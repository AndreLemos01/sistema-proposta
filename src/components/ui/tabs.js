// src/components/ui/tabs.js

import React, { useState } from 'react';

export const Tabs = ({ defaultValue, children, className }) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const handleTabClick = (value) => {
    setSelectedTab(value);
  };

  return (
    <div className={`w-full ${className}`}>
      {children.map((child) =>
        React.cloneElement(child, {
          selectedTab,
          onTabClick: handleTabClick,
        })
      )}
    </div>
  );
};

export const TabsList = ({ className, children }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const TabsTrigger = ({ value, selectedTab, onTabClick, children }) => {
  const isActive = selectedTab === value;
  return (
    <button
      className={`px-4 py-2 text-sm font-semibold ${isActive ? 'bg-[#F39C12] text-white' : 'text-[#F39C12]'}`}
      onClick={() => onTabClick(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, selectedTab, children }) => {
  if (selectedTab !== value) return null;

  return (
    <div className="mt-4">
      {children}
    </div>
  );
};
