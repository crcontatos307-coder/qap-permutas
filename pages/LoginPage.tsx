import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const user = await login(email, matricula);
      if (!user) {
        setError('Credenciais inválidas. Verifique seu e-mail e matrícula.');
      }
    } else {
      const user = await register(nome, email, matricula);
      if (!user) {
        setError('E-mail ou matrícula já cadastrados.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-pmerj-dark-blue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-bold text-pmerj-gold">QAP PERMUTA</h1>
        <p className="mt-2 text-center text-sm text-gray-300">
          Acesso exclusivo para Policiais Militares do Estado do Rio de Janeiro
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex border-b border-gray-300">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-4 text-sm font-medium text-center ${isLogin ? 'text-pmerj-blue border-b-2 border-pmerj-blue' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Entrar
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-4 text-sm font-medium text-center ${!isLogin ? 'text-pmerj-blue border-b-2 border-pmerj-blue' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Cadastrar
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <div className="mt-1">
                  <input id="nome" name="nome" type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue sm:text-sm" />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">RG Funcional (Matrícula)</label>
              <div className="mt-1">
                <input id="matricula" name="matricula" type="text" required value={matricula} onChange={(e) => setMatricula(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue sm:text-sm" />
              </div>
            </div>
             <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue sm:text-sm" />
                </div>
              </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pmerj-blue hover:bg-pmerj-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pmerj-blue disabled:bg-gray-400"
              >
                {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;