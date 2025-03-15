import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('user');

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8" />
            <span className="font-bold text-xl">Sistema de Denúncias</span>
          </Link>
          <div className="flex space-x-4">
            {location.pathname !== '/' && (
              <Link to="/" className="hover:text-indigo-200 px-3 py-2 rounded-md">
                Home
              </Link>
            )}
            {location.pathname !== '/nova-denuncia' && (
              <Link to="/nova-denuncia" className="hover:text-indigo-200 px-3 py-2 rounded-md">
                Nova Denúncia
              </Link>
            )}
            {location.pathname !== '/denuncias' && (
              <Link to="/denuncias" className="hover:text-indigo-200 px-3 py-2 rounded-md">
                Lista de Denúncias
              </Link>
            )}
            {!isAuthenticated && location.pathname !== '/cadastro' && (
              <Link to="/cadastro" className="hover:text-indigo-200 px-3 py-2 rounded-md">
                Cadastro
              </Link>
            )}
            {!isAuthenticated && location.pathname !== '/login' && (
              <Link to="/login" className="hover:text-indigo-200 px-3 py-2 rounded-md">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};