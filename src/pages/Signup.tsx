import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados de cadastro:', formData);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cadastro</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="nome"
          label="Nome"
          type="text"
          value={formData.nome}
          placeholder="Digite seu nome"
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          placeholder="Digite seu email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <InputField
          id="senha"
          label="Senha"
          type="password"
          value={formData.senha}
          placeholder="Digite sua senha"
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};