import { useState } from 'react';
import { fetchEstados as fetchEstadosUtil } from '../util/fetchEstados';
import { fetchCidades as fetchCidadesUtil } from '../util/fetchCidades';
import { handleCepChange as handleCepChangeUtil } from '../util/handleCepChange';

export const useEndereco = () => {
  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [cepError, setCepError] = useState('');
  const [formData, setFormData] = useState({
    cep: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    complemento: '',
  });

  const fetchEstados = async (): Promise<void> => {
    try {
      const estadosBrasil = await fetchEstadosUtil();
      setEstados(estadosBrasil);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
    }
  };

  const fetchCidades = async (estado: string): Promise<void> => {
    try {
      const cidades = await fetchCidadesUtil(estado);
      setCidades(cidades);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  return {
    estados,
    cidades,
    cepError,
    formData,
    setFormData,
    fetchEstados,
    fetchCidades,
    handleCepChange: (cep: string) => handleCepChangeUtil(cep, setFormData, setCepError),
  };
};
