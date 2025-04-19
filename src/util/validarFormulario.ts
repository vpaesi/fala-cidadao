import { validarCPF, validarTelefone, validarEmail, ehMaiorDeIdade } from './validacoes';
import { FormData, EnderecoData } from '../types/types';

export function validarFormulario(
  formData: FormData,
  enderecoData: EnderecoData,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
): boolean {
  const errors: { [key: string]: string } = {};

  if (!formData.nome.trim()) errors.nome = "O campo Nome é obrigatório.";
  if (!formData.dob || !ehMaiorDeIdade(formData.dob)) errors.dob = "Você deve ter pelo menos 18 anos para se cadastrar.";
  if (!validarEmail(formData.email)) errors.email = "Insira um e-mail válido.";
  if (!formData.cpf || !validarCPF(formData.cpf.replace(/\D/g, ''))) errors.cpf = "Insira um CPF válido.";
  if (!formData.telefone || !validarTelefone(formData.telefone.replace(/\D/g, ''))) errors.telefone = "Insira um telefone válido.";
  if (!enderecoData.cep.trim()) errors.cep = "O campo CEP é obrigatório.";
  if (formData.senha !== formData.confirmacaoSenha) errors.confirmacaoSenha = "As senhas não coincidem.";

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
