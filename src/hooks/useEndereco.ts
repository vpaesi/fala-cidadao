import { useState } from 'react';

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
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const data = await response.json();
      const estadosBrasil = data.map((estado: { sigla: string }) => estado.sigla);
      setEstados(estadosBrasil);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
    }
  };

  const fetchCidades = async (estado: string): Promise<void> => {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      const data = await response.json();
      const cidades = data.map((cidade: { nome: string }) => cidade.nome);
      setCidades(cidades);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleCepChange = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setCepError('CEP inválido.');
        } else {
          setCepError('');
          setFormData((prev) => ({
            ...prev,
            cep, // Atualiza o campo 'cep'
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,
          }));
          await fetchCidades(data.uf);
        }
      } catch {
        setCepError('Erro ao buscar o CEP.');
      }
    } else {
      setCepError('O CEP deve ter 8 dígitos.');
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
    handleCepChange,
  };
};