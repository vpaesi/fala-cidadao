import { validarCPF } from './validarCPF';
import { FormData, EnderecoData } from '../types/types';

export function validarFormulario(
  formData: FormData,
  enderecoData: EnderecoData,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
): boolean {
  const errors: { [key: string]: string } = {};

  if (!formData.nome.trim()) errors.nome = "O campo Nome é obrigatório.";

  if (
    !formData.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
    !formData.email.includes('.com')
  ) {
    errors.email = "Insira um e-mail válido.";
  }

  if (!enderecoData.cep.trim()) errors.cep = "O campo CEP é obrigatório.";
  
  if (formData.senha !== formData.confirmacaoSenha) {
    errors.confirmacaoSenha = "As senhas não coincidem.";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
