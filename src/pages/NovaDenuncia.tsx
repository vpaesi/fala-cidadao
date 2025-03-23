import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDenuncias } from '../context/DenunciasContext';
import { InputField } from '../components/InputField';
import { ImageUpload } from '../components/ImageUpload';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { PageLayout } from '../components/PageLayout';
import { EnderecoForm } from '../components/EnderecoForm';
import { useEndereco } from '../hooks/useEndereco';
import { handleSubmitDenuncia } from '../util/handleSubmitDenuncia';

export const NovaDenuncia: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user');
  const { addDenuncia, loading } = useDenuncias();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
  });
  const [imagemFile, setImagemFile] = useState<File | null>(null);

  const {
    estados,
    cidades,
    cepError,
    formData: enderecoData,
    setFormData: setEnderecoData,
    fetchEstados,
    handleCepChange,
  } = useEndereco();

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Por favor, faça o login primeiro.');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchEstados();
  }, [fetchEstados]);

  const handleSubmit = (e: React.FormEvent) => {
    handleSubmitDenuncia(e, formData, enderecoData, imagemFile, addDenuncia, navigate);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageLayout title="Nova Denúncia">
        <Form onSubmit={handleSubmit}>
          <InputField
            id="titulo"
            label="Dê um título à sua denúncia"
            type="text"
            value={formData.titulo}
            placeholder="Digite o título"
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            required
          />
          <InputField
            id="descricao"
            label="Descrição"
            type="textarea"
            value={formData.descricao}
            placeholder="Descreva o problema..."
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            required
          />
          <EnderecoForm
            formData={enderecoData}
            cep={enderecoData.cep}
            cepError={cepError}
            estados={estados}
            cidades={cidades}
            onCepChange={(e) => handleCepChange(e.target.value)}
            onEstadoChange={(e) => setEnderecoData({ ...enderecoData, estado: e.target.value })}
            onCidadeChange={(e) => setEnderecoData({ ...enderecoData, cidade: e.target.value })}
            onInputChange={(field, value) => setEnderecoData({ ...enderecoData, [field]: value })}
          />
          <ImageUpload onChange={(e) => setImagemFile(e.target.files?.[0] || null)} />
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={() => navigate('/')} className="bg-white text-gray-700">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 text-white">
              {loading ? <Loader2 className="animate-spin" /> : 'Enviar Denúncia'}
            </Button>
          </div>
        </Form>
      </PageLayout>
    </div>
  );
};
