
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import PermutaPage from './pages/PermutaPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import PendingApprovalPage from './pages/PendingApprovalPage';
import { Page } from './types';
import { HomeIcon, ShoppingCartIcon, ArrowsRightLeftIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Main />
      </DataProvider>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('Início');

  useEffect(() => {
    if (user && user.status === 'aprovado') {
      setCurrentPage('Início');
    }
  }, [user]);

  const navigationItems = useMemo(() => [
    { name: 'Início' as Page, icon: HomeIcon },
    { name: 'Permutas' as Page, icon: ArrowsRightLeftIcon },
    { name: 'Marketplace' as Page, icon: ShoppingCartIcon },
    { name: 'Meu Perfil' as Page, icon: UserCircleIcon },
  ], []);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'Início':
        return <DashboardPage />;
      case 'Marketplace':
        return <MarketplacePage />;
      case 'Permutas':
        return <PermutaPage />;
      case 'Meu Perfil':
        return <ProfilePage setCurrentPage={setCurrentPage} />;
      default:
        return <DashboardPage />;
    }
  }, [currentPage]);
  
  if (!user) {
    return <LoginPage />;
  }

  if (user.status === 'pendente') {
    return <PendingApprovalPage />;
  }

  return (
    <div className="flex h-screen bg-pmerj-light-gray font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} navigationItems={navigationItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-pmerj-light-gray pb-20 md:pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} navigationItems={navigationItems} />
    </div>
  );
};

export default App;