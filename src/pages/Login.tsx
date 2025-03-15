import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados de login:', formData);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8" style={{ border: '1px solid black', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', padding: 50, marginTop: '2.5rem'}}>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ border: '1px solid black', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: 10, marginTop: '1rem'}}
          />
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            required
            style={{ border: '1px solid black', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: 10, marginTop: '1rem'}}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};