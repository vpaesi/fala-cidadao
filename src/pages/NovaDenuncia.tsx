import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Loader2 } from 'lucide-react';
import { useDenuncias } from '../context/DenunciasContext';

export const NovaDenuncia: React.FC = () => {
  const navigate = useNavigate();
  const { addDenuncia, loading } = useDenuncias();
  const [formData, setFormData] = useState({
    descricao: '',
    localizacao: '',
    imagemUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDenuncia(formData);
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
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
            Localização
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
              <MapPin className="h-5 w-5" />
            </span>
            <input
              type="text"
              id="localizacao"
              className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Digite o endereço..."
              value={formData.localizacao}
              onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="imagemUrl" className="block text-sm font-medium text-gray-700">
            URL da Imagem
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
              <Camera className="h-5 w-5" />
            </span>
            <input
              type="url"
              id="imagemUrl"
              className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://exemplo.com/imagem.jpg"
              value={formData.imagemUrl}
              onChange={(e) => setFormData({ ...formData, imagemUrl: e.target.value })}
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