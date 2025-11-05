
import React from 'react';
import { Page } from '../types';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  navigationItems: { name: Page; icon: React.ElementType }[];
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, navigationItems }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-pmerj-dark-blue border-t border-pmerj-blue">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setCurrentPage(item.name)}
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-pmerj-blue/50 group ${
              currentPage === item.name ? 'text-pmerj-gold' : 'text-gray-400'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
