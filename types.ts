
export interface User {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  status: 'aprovado' | 'pendente';
}

export type MarketplaceItemType = 'venda' | 'troca' | 'doacao';
export type MarketplaceCategory = 'Uniformes' | 'Equipamentos Táticos' | 'Veículos' | 'Imóveis' | 'Outros';

export interface MarketplaceItem {
  id: string;
  titulo: string;
  descricao: string;
  tipo: MarketplaceItemType;
  preco?: number;
  categoria: MarketplaceCategory;
  criadoPor: string; // userId
  contato: string; // email or phone
  imageUrl: string;
}

export interface PermutaProfile {
  userId: string;
  nome: string;
  unidadeAtual: string;
  patente: string;
  qualificacoes: string[];
  unidadesDesejadas: string[];
}

export type Page = 'Início' | 'Marketplace' | 'Permutas' | 'Meu Perfil';
