import React, { useState } from 'react';
import { InputField } from './InputField';
import { validarNome, validarCPF, validarTelefone } from '../util/validacoes';
import { formatarCPF, formatarTelefone } from '../util/formatacoes';

interface DadosPessoaisFormProps {
  formData: {
    nome: string;
    dob: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
    confirmacaoSenha: string;
  };
  errors: { [key: string]: string };
  onChange: (field: string, value: string) => void;
}

export const DadosPessoaisForm: React.FC<DadosPessoaisFormProps> = ({ formData, errors, onChange }) => {
  const [localErrors, setErrors] = useState(errors);

  const handleNomeChange = (value: string) => {
    if (!validarNome(value)) return;
    onChange('nome', value);
  };

  const handleTelefoneChange = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, '');

    if (apenasNumeros.length > 11) {
      return;
    }

    const formattedValue = formatarTelefone(apenasNumeros);
    onChange('telefone', formattedValue);

    if (apenasNumeros.length >= 10 && !validarTelefone(apenasNumeros)) {
      setErrors((prev) => ({ ...prev, telefone: 'Insira um telefone válido.' }));
    } else {
      setErrors((prev) => ({ ...prev, telefone: '' }));
    }
  };

  const handleCpfChange = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, '');

    if (apenasNumeros.length > 11) {
      return;
    }

    const formattedValue = formatarCPF(apenasNumeros);
    onChange('cpf', formattedValue);
    
    if (apenasNumeros.length === 11 && !validarCPF(apenasNumeros)) {
      setErrors((prev) => ({ ...prev, cpf: 'Insira um CPF válido.' }));
    } else {
      setErrors((prev) => ({ ...prev, cpf: '' }));
    }
  };

  const handleDobChange = (value: string) => {
    onChange('dob', value);
  };

  const handleEmailChange = (value: string) => {
    onChange('email', value);
  };

  return (
    <>
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem', paddingTop: '0.5rem' }}>Dados Pessoais</h2>
      <InputField
        id="nome"
        label="Nome Completo"
        type="text"
        value={formData.nome}
        placeholder="Digite seu nome"
        onChange={(e) => handleNomeChange(e.target.value)}
        required
        errorMessage={localErrors.nome}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="dob"
          label="Data de Nascimento"
          type="date"
          value={formData.dob}
          onChange={(e) => handleDobChange(e.target.value)}
          required
          errorMessage={errors.dob}
        />
        <InputField
          id="cpf"
          label="CPF"
          type="text"
          value={formData.cpf}
          placeholder="Digite seu CPF"
          onChange={(e) => handleCpfChange(e.target.value)}
          required
          errorMessage={localErrors.cpf}
        />
      </div>
      <InputField
        id="telefone"
        label="Telefone"
        type="text"
        value={formData.telefone}
        placeholder="(DDD) 9xxxx-xxxx"
        onChange={(e) => handleTelefoneChange(e.target.value)}
        required
        errorMessage={localErrors.telefone}
      />
      <InputField
        id="email"
        label="E-mail"
        type="email"
        value={formData.email}
        placeholder="Digite seu e-mail"
        onChange={(e) => handleEmailChange(e.target.value)}
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
          onChange={(e) => onChange('senha', e.target.value)}
          required
          errorMessage={localErrors.senha}
        />
        <InputField
          id="confirmacaoSenha"
          label="Confirmação de Senha"
          type="password"
          value={formData.confirmacaoSenha}
          placeholder="Confirme sua senha"
          onChange={(e) => onChange('confirmacaoSenha', e.target.value)}
          required
          errorMessage={localErrors.confirmacaoSenha}
        />
      </div>
    </>
  );
};