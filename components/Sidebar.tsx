import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  navigationItems: { name: Page; icon: React.ElementType }[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, navigationItems }) => {
  const { user, logout } = useAuth();
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow bg-pmerj-dark-blue pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-2xl font-bold text-pmerj-gold">QAP PERMUTA</h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.name);
                }}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  currentPage === item.name
                    ? 'bg-pmerj-blue text-white'
                    : 'text-gray-300 hover:bg-pmerj-blue/50 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-pmerj-blue p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-white">{user?.nome}</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">Ver perfil</p>
              </div>
              <button onClick={logout} className="ml-auto text-gray-400 hover:text-white">
                <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;