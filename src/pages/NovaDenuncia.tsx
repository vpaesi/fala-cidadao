import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDenuncias } from '../context/DenunciasContext';

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
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="descricao"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Descreva o problema..."
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            required
            maxLength={500}
          />
        </div>

        <div>
          <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
            CEP
          </label>
          <input
            type="text"
            id="cep"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite o CEP"
            value={cep}
            onChange={handleCepChange}
            maxLength={8}
            required
          />
          {cepError && <p className="text-red-500 text-sm mt-1">{cepError}</p>}
        </div>

        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <input
            type="text"
            id="estado"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.estado}
            readOnly
            required
          />
        </div>

        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <input
            type="text"
            id="cidade"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.cidade}
            readOnly
            required
          />
        </div>

        <div>
          <label htmlFor="rua" className="block text-sm font-medium text-gray-700">
            Rua
          </label>
          <input
            type="text"
            id="rua"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.rua}
            readOnly
            required
          />
        </div>

        <div>
          <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
            Número (opcional)
          </label>
          <input
            type="text"
            id="numero"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite o número"
            value={formData.numero}
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">
            Complemento (opcional)
          </label>
          <input
            type="text"
            id="complemento"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite o complemento"
            value={formData.complemento}
            onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="imagemUrl" className="block text-sm font-medium text-gray-700">
            Upload de Imagem
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="imagemUrl"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

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