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

export const NovaDenuncia: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user'); 
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const { addDenuncia, loading } = useDenuncias();
  const [formData, setFormData] = useState({
    titulo: '',
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
  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Por favor, faça o login primeiro.');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, users]);

  const fetchEstados = async () => {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const data = await response.json();
      const estadosBrasil = data.map((estado: { sigla: string }) => estado.sigla);
      setEstados(estadosBrasil);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
    }
  };

  const fetchCidades = async (estado: string) => {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      const data = await response.json();
      const cidades = data.map((cidade: { nome: string }) => cidade.nome);
      setCidades(cidades);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          await fetchCidades(data.uf);
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
        : 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg';

      await addDenuncia({ ...formData, imagemUrl });
      navigate('/denuncias');
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error);
    }
  };

  useEffect(() => {
    fetchEstados();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" style={{ border: '1px solid black', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', marginTop: 20, marginBottom: 20, padding: 5 }} title='Nova Denúncia'>
      <PageLayout title="Nova Denúncia">
        <div className="mb-4" style={{ paddingBottom: 10, paddingTop: 0 }}>
          <h2 className='subtitulo' style={{ padding: 0, margin: 0 }}>Não se preocupe, a sua denúncia será anônima</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <InputField
            id="titulo"
            label="Dê um título à sua denúncia"
            type="text"
            value={formData.descricao}
            placeholder="Nome completo"
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            required
            style={{ padding: '10px', border: '1px solid' }}
          />
          <InputField
            id="descricao"
            label="Descrição"
            type="textarea"
            value={formData.descricao}
            placeholder="Descreva o problema..."
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            required
            style={{ padding: '10px', border: '1px solid' }}
          />

          <EnderecoForm
            formData={formData}
            cep={cep}
            cepError={cepError}
            estados={estados}
            cidades={cidades}
            onCepChange={handleCepChange}
            onEstadoChange={(e) => {
              const estado = e.target.value;
              setFormData({ ...formData, estado });
              fetchCidades(estado);
            }}
            onCidadeChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            onInputChange={(field, value) => setFormData({ ...formData, [field]: value })}
          />

          <div>
            <ImageUpload onChange={handleImageUpload} />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => navigate('/')}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Enviando...
                </>
              ) : (
                'Enviar Denúncia'
              )}
            </Button>
          </div>
        </Form>
      </PageLayout>
    </div>
  );
};