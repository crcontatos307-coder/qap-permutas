
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { PermutaProfile } from '../types';
import { UserCircleIcon, MapPinIcon, AcademicCapIcon, ArrowsRightLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

const PermutaPage: React.FC = () => {
  const { user } = useAuth();
  const { getPermutaProfile, savePermutaProfile, findMatches } = useData();
  
  const [profile, setProfile] = useState<PermutaProfile | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [directMatches, setDirectMatches] = useState<PermutaProfile[]>([]);
  const [partialMatches, setPartialMatches] = useState<PermutaProfile[]>([]);

  useEffect(() => {
    if (user) {
      const userProfile = getPermutaProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
        const { directMatches, partialMatches } = findMatches(userProfile);
        setDirectMatches(directMatches);
        setPartialMatches(partialMatches);
      } else {
        setIsEditing(true);
        setProfile({
            userId: user.id,
            nome: user.nome,
            unidadeAtual: '',
            patente: '',
            qualificacoes: [],
            unidadesDesejadas: [],
        });
      }
    }
  }, [user, getPermutaProfile, findMatches]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if(profile){
        savePermutaProfile(profile);
        setIsEditing(false);
    }
  };

  const handleTagChange = (e: React.KeyboardEvent<HTMLInputElement>, field: 'qualificacoes' | 'unidadesDesejadas') => {
    if (e.key === 'Enter' && e.currentTarget.value && profile) {
      e.preventDefault();
      setProfile({ ...profile, [field]: [...profile[field], e.currentTarget.value] });
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tag: string, field: 'qualificacoes' | 'unidadesDesejadas') => {
    if(profile){
        setProfile({ ...profile, [field]: profile[field].filter(t => t !== tag) });
    }
  };


  if (!profile) {
    return <div className="md:ml-64 text-center">Carregando perfil...</div>;
  }

  if (isEditing) {
    return (
      <div className="md:ml-64 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-pmerj-dark-blue mb-4">Meu Perfil de Permuta</h1>
        <p className="text-pmerj-gray mb-6">Preencha ou atualize suas informações para encontrar permutas compatíveis.</p>
        <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Unidade Atual</label>
            <input value={profile.unidadeAtual} onChange={e => setProfile({...profile, unidadeAtual: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Patente</label>
            <input value={profile.patente} onChange={e => setProfile({...profile, patente: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualificações (pressione Enter para adicionar)</label>
            <div className="flex flex-wrap gap-2 mt-1">
                {profile.qualificacoes.map(q => <span key={q} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">{q} <button type="button" onClick={() => removeTag(q, 'qualificacoes')} className="ml-2 text-blue-800">x</button></span>)}
            </div>
            <input onKeyDown={e => handleTagChange(e, 'qualificacoes')} placeholder="Ex: Curso de Patamo" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unidades Desejadas (pressione Enter para adicionar)</label>
            <div className="flex flex-wrap gap-2 mt-1">
                {profile.unidadesDesejadas.map(u => <span key={u} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">{u} <button type="button" onClick={() => removeTag(u, 'unidadesDesejadas')} className="ml-2 text-green-800">x</button></span>)}
            </div>
            <input onKeyDown={e => handleTagChange(e, 'unidadesDesejadas')} placeholder="Ex: BOPE" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-pmerj-blue text-white font-bold py-2 px-4 rounded">Salvar Perfil</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="md:ml-64">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-pmerj-dark-blue">{profile.nome}</h2>
                    <p className="text-pmerj-gray">{profile.patente}</p>
                </div>
                <button onClick={() => setIsEditing(true)} className="text-sm bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300">Editar Perfil</button>
            </div>
            <div className="mt-4 border-t pt-4 space-y-2">
                <p className="flex items-center"><MapPinIcon className="h-5 w-5 mr-2 text-pmerj-blue" /> <strong>Unidade Atual:</strong> <span className="ml-2">{profile.unidadeAtual}</span></p>
                <p className="flex items-start"><CheckBadgeIcon className="h-5 w-5 mr-2 text-pmerj-blue flex-shrink-0" /> <strong>Qualificações:</strong> <span className="ml-2 flex flex-wrap gap-2">{profile.qualificacoes.map(q => <span key={q} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">{q}</span>)}</span></p>
                <p className="flex items-start"><ArrowsRightLeftIcon className="h-5 w-5 mr-2 text-pmerj-blue flex-shrink-0" /> <strong>Unidades Desejadas:</strong> <span className="ml-2 flex flex-wrap gap-2">{profile.unidadesDesejadas.map(u => <span key={u} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">{u}</span>)}</span></p>
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-pmerj-dark-blue mb-4">Permutas Compatíveis (Match 100%)</h2>
            {directMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {directMatches.map(match => <MatchCard key={match.userId} match={match} currentUserProfile={profile} />)}
                </div>
            ) : <p className="text-pmerj-gray bg-white p-4 rounded-lg shadow-sm">Nenhuma permuta 100% compatível encontrada no momento.</p>}
        </div>

        <div className="mt-8">
            <h2 className="text-2xl font-bold text-pmerj-dark-blue mb-4">Matches Parciais</h2>
            {partialMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {partialMatches.map(match => <MatchCard key={match.userId} match={match} currentUserProfile={profile} />)}
                </div>
            ) : <p className="text-pmerj-gray bg-white p-4 rounded-lg shadow-sm">Nenhum match parcial encontrado.</p>}
        </div>
    </div>
  );
};

const MatchCard: React.FC<{ match: PermutaProfile, currentUserProfile: PermutaProfile }> = ({ match, currentUserProfile }) => {
    const userWantsOtherUnit = currentUserProfile.unidadesDesejadas.includes(match.unidadeAtual);
    const otherWantsUserUnit = match.unidadesDesejadas.includes(currentUserProfile.unidadeAtual);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-pmerj-gold">
            <div className="flex items-center mb-2">
                <UserCircleIcon className="h-8 w-8 text-pmerj-gray mr-3"/>
                <div>
                    <p className="font-bold text-pmerj-dark-blue">{match.nome}</p>
                    <p className="text-sm text-pmerj-gray">{match.patente}</p>
                </div>
            </div>
            <div className="text-sm space-y-2">
                <p><strong className="text-pmerj-blue">Está em:</strong> {match.unidadeAtual}</p>
                <p><strong className="text-pmerj-blue">Deseja ir para:</strong> {match.unidadesDesejadas.join(', ')}</p>
                {userWantsOtherUnit && <p className="text-green-600 font-semibold">✓ Você quer ir para a unidade dele.</p>}
                {otherWantsUserUnit && <p className="text-green-600 font-semibold">✓ Ele quer ir para a sua unidade.</p>}
            </div>
        </div>
    )
}

export default PermutaPage;
