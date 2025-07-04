import React, { useState } from 'react';
import { useEndereco } from '../hooks/useEndereco';
import { EnderecoForm } from '../components/EnderecoForm';
import { validarFormulario } from '../util/validarFormulario';
import { DadosPessoaisForm } from '../components/DadosPessoaisForm';
import { handleSubmitCadastro } from '../util/handleSubmitCadastro';
import { toast } from 'react-toastify';
import { ehMaiorDeIdade } from '../util/validarIdade';

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

  const handleDobChange = (value: string) => {
    if (!ehMaiorDeIdade(value)) {
      setErrors((prev) => ({ ...prev, dob: 'Você deve ter pelo menos 18 anos para se cadastrar.' }));
    } else {
      setErrors((prev) => ({ ...prev, dob: '' }));
    }

    setFormData((prev) => ({ ...prev, dob: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validarFormulario(formData, enderecoData, setErrors);

    if (!isValid) {
      toast.error('Por favor, revise os campos com erro.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return;
    }

    handleSubmitCadastro(e, formData, enderecoData, () => {
      toast.success('Cadastro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });

      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DadosPessoaisForm
        formData={formData}
        errors={errors}
        onChange={(field, value) => {
          if (field === 'dob') {
            handleDobChange(value);
          } else {
            setFormData({ ...formData, [field]: value });
          }
        }}
      />
      <EnderecoForm
        formData={enderecoData}
        cep={enderecoData.cep}
        cepError={cepError}
        estados={estados}
        cidades={cidades}
        onCepChange={(cep) => handleCepChange(cep)}
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
