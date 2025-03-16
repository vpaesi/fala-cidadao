import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    dob: '',
    cpf: '',
    telefone: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
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
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="nome"
          label="Nome Completo"
          type="text"
          value={formData.nome}
          placeholder="Digite seu nome"
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <InputField
        id='dob'
        label='Data de Nascimento'
        type='date'
        value={formData.dob}
        required
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
        <InputField
          id="cpf"
          label="CPF"
          type="text"
          value={formData.cpf}
          placeholder="Digite seu CPF"
          onChange={(e) => setFormData({...formData, cpf: e.target.value })}
          required
        />
        <InputField
          id="telefone"
          label="Telefone"
          type="text"
          value={formData.telefone}
          placeholder="Digite seu telefone"
          onChange={(e) => setFormData({...formData, telefone: e.target.value })}
          required
        />
       {/* EnderecoForm aqui */}
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
      </>
  );
};