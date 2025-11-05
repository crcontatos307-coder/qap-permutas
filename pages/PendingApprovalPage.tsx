
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PendingApprovalPage: React.FC = () => {
  const { user, simulateApproval, logout } = useAuth();
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      simulateApproval();
    }, 2000); // Simulate network delay
  };

  return (
    <div className="min-h-screen bg-pmerj-dark-blue flex flex-col justify-center items-center text-white p-4">
      <div className="text-center bg-pmerj-blue/50 p-8 rounded-lg shadow-2xl max-w-lg">
        <h1 className="text-3xl font-bold text-pmerj-gold mb-4">Aguardando Aprovação</h1>
        <p className="text-gray-200 mb-2">
          Olá, {user?.nome}. Seu cadastro foi recebido com sucesso.
        </p>
        <p className="text-gray-200 mb-6">
          Sua conta está pendente de verificação e aprovação por um administrador. Você será notificado por e-mail quando seu acesso for liberado.
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Aviso de Protótipo</p>
          <p>Esta é uma versão de demonstração. Clique no botão abaixo para simular a aprovação da sua conta.</p>
        </div>
        <button
          onClick={handleSimulate}
          disabled={simulating}
          className="w-full bg-pmerj-gold text-pmerj-dark-blue font-bold py-2 px-4 rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pmerj-dark-blue focus:ring-pmerj-gold disabled:bg-amber-200 disabled:cursor-not-allowed"
        >
          {simulating ? 'Aprovando...' : 'Simular Aprovação de Admin'}
        </button>
        <button
          onClick={logout}
          className="mt-4 text-sm text-gray-300 hover:text-white"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
