import { useState } from 'react';
import { EnderecoData } from '../types/types';
import { fetchEstados as fetchEstadosUtil } from '../util/fetchEstados';
import { fetchCidades as fetchCidadesUtil } from '../util/fetchCidades';
import { validarCEP } from '../util/validarCEP';

export const useEndereco = () => {
  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [cepError, setCepError] = useState('');
  const [formData, setFormData] = useState<EnderecoData>({
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
      const cidadesBrasil = await fetchCidadesUtil(estado);
      setCidades(cidadesBrasil);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleCepChange = async (cep: string): Promise<void> => {
    setFormData((prev) => ({ ...prev, cep }));

    if (!validarCEP(cep)) {
      setCepError('CEP inválido.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
      } else {
        setCepError('');
        setFormData((prev) => ({
          ...prev,
          estado: data.uf,
          cidade: data.localidade,
          rua: data.logradouro,
        }));
        await fetchCidades(data.uf);
      }
    } catch (error) {
      setCepError('Erro ao buscar o CEP.');
      console.error('Erro ao buscar o CEP:', error);
    }
  };

  const handleEstadoChange = async (estado: string): Promise<void> => {
    setFormData((prev) => ({ ...prev, estado, cidade: '' }));
    try {
      await fetchCidades(estado);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleCidadeChange = (cidade: string): void => {
    setFormData((prev) => ({ ...prev, cidade }));
  };

  return {
    estados,
    cidades,
    cepError,
    formData,
    setFormData,
    fetchEstados,
    fetchCidades,
    handleCepChange,
    handleEstadoChange,
    handleCidadeChange,
  };
};
