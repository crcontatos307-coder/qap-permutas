
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MarketplaceItem, PermutaProfile, MarketplaceCategory, MarketplaceItemType } from '../types';
import { MOCK_MARKETPLACE_ITEMS, MOCK_PERMUTA_PROFILES } from '../services/mockDb';

interface DataContextType {
  marketplaceItems: MarketplaceItem[];
  permutaProfiles: PermutaProfile[];
  addMarketplaceItem: (item: Omit<MarketplaceItem, 'id' | 'imageUrl'>) => void;
  getPermutaProfile: (userId: string) => PermutaProfile | undefined;
  savePermutaProfile: (profile: PermutaProfile) => void;
  findMatches: (currentUserProfile: PermutaProfile) => { directMatches: PermutaProfile[], partialMatches: PermutaProfile[] };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(MOCK_MARKETPLACE_ITEMS);
  const [permutaProfiles, setPermutaProfiles] = useState<PermutaProfile[]>(MOCK_PERMUTA_PROFILES);

  const addMarketplaceItem = (item: Omit<MarketplaceItem, 'id' | 'imageUrl'>) => {
    const newItem: MarketplaceItem = {
      ...item,
      id: `item-${Date.now()}`,
      imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
    };
    setMarketplaceItems(prev => [newItem, ...prev]);
  };
  
  const getPermutaProfile = (userId: string) => {
    return permutaProfiles.find(p => p.userId === userId);
  };

  const savePermutaProfile = (profile: PermutaProfile) => {
    setPermutaProfiles(prev => {
      const index = prev.findIndex(p => p.userId === profile.userId);
      if (index > -1) {
        const newProfiles = [...prev];
        newProfiles[index] = profile;
        return newProfiles;
      }
      return [...prev, profile];
    });
  };

  const findMatches = (currentUserProfile: PermutaProfile) => {
    const otherProfiles = permutaProfiles.filter(p => p.userId !== currentUserProfile.userId);
    const directMatches: PermutaProfile[] = [];
    const partialMatches: PermutaProfile[] = [];

    for (const otherProfile of otherProfiles) {
      if (currentUserProfile.patente !== otherProfile.patente) continue;

      const userWantsOtherUnit = currentUserProfile.unidadesDesejadas.includes(otherProfile.unidadeAtual);
      const otherWantsUserUnit = otherProfile.unidadesDesejadas.includes(currentUserProfile.unidadeAtual);

      if (userWantsOtherUnit && otherWantsUserUnit) {
        directMatches.push(otherProfile);
      } else if (userWantsOtherUnit || otherWantsUserUnit) {
         if(!directMatches.some(p => p.userId === otherProfile.userId)){
             partialMatches.push(otherProfile);
         }
      }
    }
    return { directMatches, partialMatches };
  };

  return (
    <DataContext.Provider value={{ marketplaceItems, permutaProfiles, addMarketplaceItem, getPermutaProfile, savePermutaProfile, findMatches }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
