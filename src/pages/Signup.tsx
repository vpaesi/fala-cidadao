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

    const users = JSON.parse(localStorage.getItem('user') || '[]');
    users.push(formData);
    localStorage.setItem('user', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    navigate('/login');
   };

  return (
    <div className="max-w-md mx-auto px-2 py-4" style={{ border: '1px solid black', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', padding: 50, marginTop: '2.5rem'}}>
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