import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-indigo-600 mx-auto" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Sistema de Denúncias
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ajude a melhorar nossa cidade! Registre denúncias sobre problemas em sua região.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/nova-denuncia"
              className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-center gap-2"
            >
              Fazer uma Denúncia
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/denuncias"
              className="text-lg font-semibold leading-6 text-gray-900 hover:text-indigo-600"
            >
              Ver denúncias existentes
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Faça sua denúncia</h3>
            <p className="text-gray-600">
              Registre problemas da sua região de forma rápida e segura.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Acompanhamento</h3>
            <p className="text-gray-600">
              Acompanhe o status das denúncias registradas na plataforma.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Transparência</h3>
            <p className="text-gray-600">
              Todas as denúncias são públicas e podem ser visualizadas por qualquer cidadão.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};