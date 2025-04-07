
import React, { ReactNode } from 'react';
import Navigation from './Navigation';

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
}

const MobileLayout = ({ children, activeTab }: MobileLayoutProps) => {
  return (
    <div className="mobile-container">
      <div className="mobile-content px-4 pt-6">
        {children}
      </div>
      <Navigation activeTab={activeTab} />
    </div>
  );
};

export default MobileLayout;
