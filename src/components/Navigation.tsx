
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Dumbbell, Utensils, BarChart2, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
}

const Navigation = ({ activeTab }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'workout', label: 'Workout', icon: Dumbbell, path: '/workout' },
    { id: 'diet', label: 'Diet', icon: Utensils, path: '/diet' },
    { id: 'progress', label: 'Progress', icon: BarChart2, path: '/progress' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
