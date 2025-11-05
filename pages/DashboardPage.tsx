
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ShoppingCartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { marketplaceItems, permutaProfiles, getPermutaProfile, findMatches } = useData();

  const userProfile = user ? getPermutaProfile(user.id) : undefined;
  const { directMatches, partialMatches } = userProfile ? findMatches(userProfile) : { directMatches: [], partialMatches: [] };
  const totalMatches = directMatches.length + partialMatches.length;

  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pmerj-dark-blue">Bem-vindo, {user?.nome}!</h1>
        <p className="text-pmerj-gray">Aqui está um resumo das atividades recentes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-pmerj-blue">
            <ShoppingCartIcon className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <p className="text-lg text-pmerj-gray">Itens no Marketplace</p>
            <p className="text-3xl font-bold text-pmerj-dark-blue">{marketplaceItems.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-800">
            <ArrowsRightLeftIcon className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <p className="text-lg text-pmerj-gray">Oportunidades de Permuta</p>
            <p className="text-3xl font-bold text-pmerj-dark-blue">{totalMatches}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-pmerj-dark-blue mb-4">Avisos Importantes</h2>
        <ul className="list-disc list-inside space-y-2 text-pmerj-gray">
          <li>Lembre-se que todas as negociações são de responsabilidade dos envolvidos.</li>
          <li>A permuta de serviço deve seguir as normas e regulamentos da corporação.</li>
          <li>Mantenha seus dados de perfil e contato sempre atualizados.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
