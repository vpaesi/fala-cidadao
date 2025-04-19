import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin } from 'lucide-react';
import { useDenuncias } from '../context/DenunciasContext';
import { Card } from '../components/Card';
import { LoadingScreen } from '../components/LoadingScreen';

export const ListaDenuncias: React.FC = () => {
  const { denuncias, loading } = useDenuncias();

  if (loading) {
    return <LoadingScreen />;
  }

  // Ordena as denúncias do mais recente para o mais antigo
  const denunciasOrdenadas = [...denuncias].sort(
    (a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Lista de Denúncias</h1>

      {denunciasOrdenadas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhuma denúncia registrada ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {denunciasOrdenadas.map((denuncia) => (
            <Card
              key={denuncia.id}
              imageUrl={denuncia.imagemUrl || ''}
              title={`${denuncia.titulo}: ${format(new Date(denuncia.dataCriacao), "d'/'MM'/'yyyy 'às' HH:mm", {
                locale: ptBR,
              })}`}
              description={denuncia.descricao}
              footer={
                <div className="text-gray-600 text-sm">
                  <MapPin className="h-5 w-5 inline-block mr-1" />
                  {`${denuncia.rua}, ${denuncia.cidade} - ${denuncia.estado}`}
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
