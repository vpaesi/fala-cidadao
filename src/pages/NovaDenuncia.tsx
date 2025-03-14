import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDenuncias } from '../context/DenunciasContext';
import { InputField } from '../components/InputField';
import { ImageUpload } from '../components/ImageUpload';

export const NovaDenuncia: React.FC = () => {
  const navigate = useNavigate();
  const { addDenuncia, loading } = useDenuncias();
  const [formData, setFormData] = useState({
    descricao: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    complemento: '',
    imagemUrl: '',
  });
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState('');

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCep(value);

    if (value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (data.erro) {
          setCepError('CEP inválido.');
        } else {
          setCepError('');
          setFormData((prev) => ({
            ...prev,
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,
          }));
        }
      } catch {
        setCepError('Erro ao buscar o CEP.');
      }
    } else {
      setCepError('O CEP deve ter 8 dígitos.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.rua || !formData.estado || !formData.cidade) {
      alert('Por favor, preencha o endereço completo.');
      return;
    }

    try {
      const imagemUrl = imagemFile
        ? URL.createObjectURL(imagemFile)
        : 'https://via.placeholder.com/150?text=Sem+Imagem';

      await addDenuncia({ ...formData, imagemUrl });
      navigate('/denuncias');
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nova Denúncia</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="descricao"
          label="Descrição"
          type="text"
          value={formData.descricao}
          placeholder="Descreva o problema..."
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
        />

        <InputField
          id="cep"
          label="CEP"
          type="text"
          value={cep}
          placeholder="Digite o CEP"
          onChange={handleCepChange}
          required
          errorMessage={cepError}
        />

        <InputField
          id="estado"
          label="Estado"
          value={formData.estado}
          onChange={() => {}}
          readOnly
          required
        />

        <InputField
          id="cidade"
          label="Cidade"
          value={formData.cidade}
          onChange={() => {}}
          readOnly
          required
        />

        <InputField
          id="rua"
          label="Rua"
          value={formData.rua}
          onChange={() => {}}
          readOnly
          required
        />

        <InputField
          id="numero"
          label="Número (opcional)"
          value={formData.numero}
          placeholder="Digite o número"
          onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
        />

        <InputField
          id="complemento"
          label="Complemento (opcional)"
          value={formData.complemento}
          placeholder="Digite o complemento"
          onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
        />

        <ImageUpload onChange={handleImageUpload} />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Enviando...
              </>
            ) : (
              'Enviar Denúncia'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};