
import React, { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface PreferenceSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const PreferenceSection = ({ title, icon, children }: PreferenceSectionProps) => {
  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-app-primary/20 rounded-full flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      
      {children}
    </div>
  );
};

interface PreferenceItemProps {
  label: string;
  value?: string;
  onClick?: () => void;
  toggle?: boolean;
  checked?: boolean;
  onToggle?: () => void;
}

export const PreferenceItem = ({ 
  label, 
  value, 
  onClick, 
  toggle, 
  checked, 
  onToggle 
}: PreferenceItemProps) => {
  return (
    <div 
      className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
      onClick={onClick}
    >
      <div className="text-sm">{label}</div>
      
      {toggle ? (
        <div 
          className={`w-10 h-5 rounded-full relative transition-colors ${
            checked ? 'bg-app-primary' : 'bg-white/20'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle && onToggle();
          }}
        >
          <div 
            className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${
              checked ? 'left-5.5' : 'left-0.5'
            }`}
          />
        </div>
      ) : (
        <div className="flex items-center text-app-text/70">
          {value && <span className="text-sm mr-2">{value}</span>}
          <ChevronRight size={16} />
        </div>
      )}
    </div>
  );
};

export default PreferenceSection;
