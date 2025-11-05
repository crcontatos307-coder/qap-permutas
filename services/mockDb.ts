
import { User, MarketplaceItem, PermutaProfile } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', nome: 'Sgt. Rocha', email: 'rocha@pmerj.gov', matricula: '111111', status: 'aprovado' },
  { id: 'user-2', nome: 'Cabo Borges', email: 'borges@pmerj.gov', matricula: '222222', status: 'aprovado' },
  { id: 'user-3', nome: 'Sd. Mathias', email: 'mathias@pmerj.gov', matricula: '333333', status: 'aprovado' },
  { id: 'user-4', nome: 'Cabo Nascimento', email: 'nascimento@pmerj.gov', matricula: '444444', status: 'aprovado' },
];

export const MOCK_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'item-1',
    titulo: 'Vendo Colete Nível III-A',
    descricao: 'Pouco uso, em perfeito estado de conservação. Acompanha capa tática.',
    tipo: 'venda',
    preco: 1200,
    categoria: 'Equipamentos Táticos',
    criadoPor: 'user-1',
    contato: 'rocha@pmerj.gov',
    imageUrl: 'https://picsum.photos/seed/colete/400/300'
  },
  {
    id: 'item-2',
    titulo: 'Troco Farda de Combate',
    descricao: 'Tamanho M, padrão novo. Troco por uma tamanho G do mesmo padrão.',
    tipo: 'troca',
    categoria: 'Uniformes',
    criadoPor: 'user-2',
    contato: 'borges@pmerj.gov',
    imageUrl: 'https://picsum.photos/seed/farda/400/300'
  },
  {
    id: 'item-3',
    titulo: 'Honda Civic 2018',
    descricao: 'Único dono, todas as revisões feitas. Perfeito para o dia a dia.',
    tipo: 'venda',
    preco: 85000,
    categoria: 'Veículos',
    criadoPor: 'user-3',
    contato: 'mathias@pmerj.gov',
    imageUrl: 'https://picsum.photos/seed/carro/400/300'
  },
];

export const MOCK_PERMUTA_PROFILES: PermutaProfile[] = [
  {
    userId: 'user-1',
    nome: 'Sgt. Rocha',
    unidadeAtual: '5º BPM - Praça da Harmonia',
    patente: '3º Sargento',
    qualificacoes: ['CAT A/B', 'Curso de Patamo'],
    unidadesDesejadas: ['BOPE', '19º BPM - Copacabana'],
  },
  {
    userId: 'user-2',
    nome: 'Cabo Borges',
    unidadeAtual: '19º BPM - Copacabana',
    patente: 'Cabo',
    qualificacoes: ['Motopatrulhamento'],
    unidadesDesejadas: ['5º BPM - Praça da Harmonia', 'UPP Rocinha'],
  },
  {
    userId: 'user-3',
    nome: 'Sd. Mathias',
    unidadeAtual: 'BOPE',
    patente: 'Soldado',
    qualificacoes: ['Operações Especiais'],
    unidadesDesejadas: ['CFAP'],
  },
  {
    userId: 'user-4',
    nome: 'Cabo Nascimento',
    unidadeAtual: 'UPP Rocinha',
    patente: 'Cabo',
    qualificacoes: [],
    unidadesDesejadas: ['19º BPM - Copacabana'],
  }
];
