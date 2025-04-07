
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface WorkoutTabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

const WorkoutTabs = ({ children, defaultTab = "today" }: WorkoutTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
      <TabsList className="w-full grid grid-cols-3 bg-white/5 rounded-xl p-1">
        <TabsTrigger value="today" className="rounded-lg">Today</TabsTrigger>
        <TabsTrigger value="weekly" className="rounded-lg">Weekly</TabsTrigger>
        <TabsTrigger value="history" className="rounded-lg">History</TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default WorkoutTabs;
