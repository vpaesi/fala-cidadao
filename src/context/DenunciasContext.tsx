import React, { createContext, useContext, useState, useCallback } from 'react';
import { Denuncia } from '../types/denuncia';

interface DenunciasContextData {
  denuncias: Denuncia[];
  addDenuncia: (denuncia: Omit<Denuncia, 'id' | 'dataCriacao'>) => Promise<void>;
  loading: boolean;
}

const DenunciasContext = createContext<DenunciasContextData>({} as DenunciasContextData);

export const DenunciasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(false);

  const addDenuncia = useCallback(async (novaDenuncia: Omit<Denuncia, 'id' | 'dataCriacao'>) => {
    setLoading(true);
    try {
      // Simulando uma chamada à API
      const denuncia: Denuncia = {
        ...novaDenuncia,
        id: crypto.randomUUID(),
        dataCriacao: new Date().toISOString(),
      };

      setDenuncias(prev => [...prev, denuncia]);
    } catch (error) {
      console.error('Erro ao adicionar denúncia:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DenunciasContext.Provider value={{ denuncias, addDenuncia, loading }}>
      {children}
    </DenunciasContext.Provider>
  );
};

export const useDenuncias = () => {
  const context = useContext(DenunciasContext);
  if (!context) {
    throw new Error('useDenuncias deve ser usado dentro de um DenunciasProvider');
  }
  return context;
};
