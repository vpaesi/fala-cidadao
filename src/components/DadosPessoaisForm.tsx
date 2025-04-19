import React, { useState } from 'react';
import { InputField } from './InputField';
import { validarCPF } from '../util/validarCPF';

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
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const handleNomeChange = (value: string) => {
    if (/[^a-zA-Z\s]/.test(value)) {
      // setLocalErrors((prev) => ({ ...prev, nome: 'Apenas letras são permitidas no Nome Completo.' }));
      return;
    }

    setLocalErrors((prev) => ({ ...prev, nome: '' }));
    onChange('nome', value);
  };

  const handleTelefoneChange = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, '');

    const numerosRepetidos = new Set([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ]);

    if (numerosRepetidos.has(apenasNumeros)) {
      setLocalErrors((prev) => ({ ...prev, telefone: 'Número de telefone inválido.' }));
      return;
    }

    if (apenasNumeros.length > 11) {
      return;
    }

    const formattedValue = apenasNumeros.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');

    setLocalErrors((prev) => ({ ...prev, telefone: '' })); // Limpa o erro
    onChange('telefone', formattedValue);
  };

  const handleCpfChange = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, '');

    if (apenasNumeros.length > 11) {
      return;
    }

    const formattedValue = apenasNumeros
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

    if (!validarCPF(apenasNumeros)) {
      setLocalErrors((prev) => ({ ...prev, cpf: 'Insira um CPF válido.' }));
    } else {
      setLocalErrors((prev) => ({ ...prev, cpf: '' }));
    }

    onChange('cpf', formattedValue);
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
        errorMessage={localErrors.nome || errors.nome}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="dob"
          label="Data de Nascimento"
          type="date"
          value={formData.dob}
          onChange={(e) => onChange('dob', e.target.value)}
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
          errorMessage={localErrors.cpf || errors.cpf}
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
        errorMessage={localErrors.telefone || errors.telefone}
      />
      <InputField
        id="email"
        label="E-mail"
        type="email"
        value={formData.email}
        placeholder="Digite seu e-mail"
        onChange={(e) => onChange('email', e.target.value)}
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
          errorMessage={errors.senha}
        />
        <InputField
          id="confirmacaoSenha"
          label="Confirmação de Senha"
          type="password"
          value={formData.confirmacaoSenha}
          placeholder="Confirme sua senha"
          onChange={(e) => onChange('confirmacaoSenha', e.target.value)}
          required
          errorMessage={errors.confirmacaoSenha}
        />
      </div>
    </>
  );
};