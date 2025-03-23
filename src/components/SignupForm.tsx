import React, { useState } from 'react';
import { useEndereco } from '../hooks/useEndereco';
import { InputField } from '../components/InputField';
import { EnderecoForm } from '../components/EnderecoForm';
import { validarCPF } from '../util/validarCPF';
import { ehMaiorDeIdade } from '../util/validarIdade';
import { validarSenha } from '../util/validarSenha';
import { validarTelefone } from '../util/validarTelefone';

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    dob: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validarFormulario = validaformulario(formData, enderecoData, setErrors);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert('Por favor, corrija os campos destacados.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ ...formData, ...enderecoData });
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = '/login';
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
        errorMessage={errors.nome}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="dob"
          label="Data de Nascimento"
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          required
          errorMessage={errors.dob}
        />
        <InputField
          id="cpf"
          label="CPF"
          type="text"
          value={formData.cpf}
          placeholder="Digite seu CPF"
          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          required
          errorMessage={errors.cpf}
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
        errorMessage={errors.telefone}
      />
      <InputField
        id="email"
        label="E-mail"
        type="email"
        value={formData.email}
        placeholder="Digite seu e-mail"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        errorMessage={errors.email}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="senha"
          label="Senha"
          type="password"
          value={formData.senha}
          placeholder="Digite sua senha"
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          required
          errorMessage={errors.senha}
        />
        <InputField
          id="confirmacaoSenha"
          label="Confirmação de Senha"
          type="password"
          value={formData.confirmacaoSenha}
          placeholder="Confirme sua senha"
          onChange={(e) => setFormData({ ...formData, confirmacaoSenha: e.target.value })}
          required
          errorMessage={errors.confirmacaoSenha}
        />
      </div>
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

function validaformulario(formData: { nome: string; dob: string; cpf: string; telefone: string; email: string; senha: string; confirmacaoSenha: string; }, enderecoData: { cep: string; estado: string; cidade: string; rua: string; numero: string; complemento: string; }, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string; }>>) {
  return () => {
    const newErrors: { [key: string]: string; } = {};

    if (!formData.nome.trim()) newErrors.nome = 'O campo Nome é obrigatório.';
    if (!formData.dob.trim()) {
      newErrors.dob = 'O campo Data de Nascimento é obrigatório.';
    } else if (!ehMaiorDeIdade(formData.dob)) {
      newErrors.dob = 'O usuário deve ser maior de idade.';
    }
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'O campo CPF é obrigatório.';
    } else if (!validarCPF(formData.cpf)) {
      newErrors.cpf = 'O CPF informado não é válido.';
    }
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'O campo Telefone é obrigatório.';
    } else if (!validarTelefone(formData.telefone)) {
      newErrors.telefone = 'O número de celular deve conter no mínimo o DDD + 8 dígitos.';
    }
    if (!formData.email.trim()) newErrors.email = 'O campo E-mail é obrigatório.';
    if (!formData.senha.trim()) {
      newErrors.senha = 'O campo Senha é obrigatório.';
    } else if (!validarSenha(formData.senha)) {
      newErrors.senha = 'A senha deve conter no mínimo 6 caracteres.';
    }
    if (!formData.confirmacaoSenha.trim()) {
      newErrors.confirmacaoSenha = 'O campo Confirmação de Senha é obrigatório.';
    } else if (formData.senha !== formData.confirmacaoSenha) {
      newErrors.confirmacaoSenha = 'As senhas não coincidem.';
    }

    if (!enderecoData.estado.trim()) newErrors.estado = 'O campo Estado é obrigatório.';
    if (!enderecoData.cidade.trim()) newErrors.cidade = 'O campo Cidade é obrigatório.';
    if (!enderecoData.rua.trim()) newErrors.rua = 'O campo Logradouro é obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
}
