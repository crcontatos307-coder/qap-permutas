
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MarketplaceItem, MarketplaceCategory, MarketplaceItemType } from '../types';
import Modal from '../components/Modal';
import { PlusCircleIcon, TagIcon, CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

const MarketplacePage: React.FC = () => {
  const { marketplaceItems, addMarketplaceItem } = useData();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<MarketplaceCategory | 'all'>('all');

  const [newItem, setNewItem] = useState({
    titulo: '',
    descricao: '',
    tipo: 'venda' as MarketplaceItemType,
    preco: 0,
    categoria: 'Outros' as MarketplaceCategory,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addMarketplaceItem({ ...newItem, criadoPor: user.id, contato: user.email, preco: newItem.tipo === 'venda' ? Number(newItem.preco) : undefined });
      setIsModalOpen(false);
      // Reset form
      setNewItem({
        titulo: '',
        descricao: '',
        tipo: 'venda',
        preco: 0,
        categoria: 'Outros',
      });
    }
  };
  
  const filteredItems = useMemo(() => {
    if (filter === 'all') return marketplaceItems;
    return marketplaceItems.filter(item => item.categoria === filter);
  }, [filter, marketplaceItems]);

  const categories: MarketplaceCategory[] = ['Uniformes', 'Equipamentos Táticos', 'Veículos', 'Imóveis', 'Outros'];

  return (
    <div className="md:ml-64">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pmerj-dark-blue">Marketplace</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-pmerj-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-pmerj-dark-blue transition duration-300">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Criar Anúncio
        </button>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'all' ? 'bg-pmerj-blue text-white' : 'bg-white text-pmerj-gray hover:bg-gray-200'}`}>Todos</button>
            {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${filter === cat ? 'bg-pmerj-blue text-white' : 'bg-white text-pmerj-gray hover:bg-gray-200'}`}>{cat}</button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img src={item.imageUrl} alt={item.titulo} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${item.tipo === 'venda' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}</span>
              <h3 className="text-lg font-bold text-pmerj-dark-blue truncate">{item.titulo}</h3>
              <p className="text-sm text-pmerj-gray mt-1 h-10 overflow-hidden">{item.descricao}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-pmerj-blue">{item.tipo === 'venda' ? `R$ ${item.preco}` : 'A negociar'}</span>
                <span className="text-xs text-pmerj-gray bg-gray-200 px-2 py-1 rounded">{item.categoria}</span>
              </div>
               <button className="mt-4 w-full bg-pmerj-gold text-pmerj-dark-blue font-bold py-2 px-4 rounded hover:bg-amber-400">
                Ver Contato
               </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Novo Anúncio">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input type="text" name="titulo" value={newItem.titulo} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="descricao" value={newItem.descricao} onChange={handleInputChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue" required></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select name="tipo" value={newItem.tipo} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue">
                <option value="venda">Venda</option>
                <option value="troca">Troca</option>
                <option value="doacao">Doação</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <select name="categoria" value={newItem.categoria} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          {newItem.tipo === 'venda' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input type="number" name="preco" value={newItem.preco} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pmerj-blue focus:border-pmerj-blue" required />
            </div>
          )}
          <div className="pt-4 flex justify-end">
            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancelar</button>
            <button type="submit" className="bg-pmerj-blue text-white font-bold py-2 px-4 rounded">Publicar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MarketplacePage;
