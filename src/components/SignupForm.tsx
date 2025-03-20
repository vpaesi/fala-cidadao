import React, { useState } from 'react';
import { useEndereco } from '../hooks/useEndereco';
import { InputField } from '../components/InputField';
import { EnderecoForm } from '../components/EnderecoForm';

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    dob: '',
    cpf: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: '',
  });

  const {
    estados,
    cidades,
    cepError,
    formData: enderecoData,
    setFormData: setEnderecoData,
    fetchEstados,
    handleCepChange,
  } = useEndereco();

  React.useEffect(() => {
    fetchEstados();
  }, [fetchEstados]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullFormData = { ...formData, ...enderecoData };
    console.log('Dados de cadastro:', fullFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dados Pessoais</h2>
      <InputField
        id="nome"
        label="Nome Completo"
        type="text"
        value={formData.nome}
        placeholder="Digite seu nome"
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="dob"
          label="Data de Nascimento"
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          required
        />
        <InputField
          id="cpf"
          label="CPF"
          type="text"
          value={formData.cpf}
          placeholder="Digite seu CPF"
          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          required
        />
      </div>
      <InputField
        id="telefone"
        label="Telefone"
        type="text"
        value={formData.telefone}
        placeholder="Digite seu telefone"
        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
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
      <InputField
        id="confirmacaoSenha"
        label="Confirmação de Senha"
        type="password"
        value={formData.confirmacaoSenha}
        placeholder="Confirme sua senha"
        onChange={(e) => setFormData({ ...formData, confirmacaoSenha: e.target.value })}
        required
      />
      <h2 style={{ marginTop: '2rem', paddingTop: '0.5rem', borderTop: '1px solid rgb(121, 121, 122)' }}>
        Endereço
      </h2>
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
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        style={{ marginTop: '2rem', border: '1px solid rgb(121, 121, 122)' }}
      >
        Cadastrar
      </button>
    </form>
  );
};