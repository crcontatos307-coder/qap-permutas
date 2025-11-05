
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types';
import { UserCircleIcon, EnvelopeIcon, IdentificationIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

interface ProfilePageProps {
  setCurrentPage: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <div className="md:ml-64 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-pmerj-dark-blue mb-6">Meu Perfil</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center md:flex-row md:items-start">
          <UserCircleIcon className="h-24 w-24 text-pmerj-gray mb-4 md:mb-0 md:mr-6" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-pmerj-dark-blue">{user?.nome}</h2>
            <div className="mt-4 space-y-3">
              <p className="flex items-center justify-center md:justify-start text-pmerj-gray">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-pmerj-blue" />
                {user?.email}
              </p>
              <p className="flex items-center justify-center md:justify-start text-pmerj-gray">
                <IdentificationIcon className="h-5 w-5 mr-2 text-pmerj-blue" />
                Matrícula: {user?.matricula}
              </p>
              <p className={`flex items-center justify-center md:justify-start font-semibold ${user?.status === 'aprovado' ? 'text-green-600' : 'text-yellow-600'}`}>
                Status: <span className="ml-1 capitalize">{user?.status}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setCurrentPage('Permutas')}
            className="w-full bg-pmerj-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-pmerj-dark-blue transition duration-300"
          >
            Editar Perfil de Permuta
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            Sair (Logout)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
