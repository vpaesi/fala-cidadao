import React, { useState } from 'react';
import { useEndereco } from '../hooks/useEndereco';
import { EnderecoForm } from '../components/EnderecoForm';
import { validarFormulario } from '../util/validarFormulario';
import { DadosPessoaisForm } from '../components/DadosPessoaisForm';
import { handleSubmitCadastro } from '../util/handleSubmitCadastro';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validarFormulario(formData, enderecoData, setErrors);
    if (isValid) {
      handleSubmitCadastro(e, formData, enderecoData, () => {
        window.location.href = "/login";
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DadosPessoaisForm
        formData={formData}
        errors={errors}
        onChange={(field, value) => setFormData({ ...formData, [field]: value })}
      />
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
