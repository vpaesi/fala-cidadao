export interface EnderecoData {
  cep: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento: string;
}

export interface FormData {
  nome: string;
  email: string;
  senha?: string;
  dob?: string;
  cpf?: string;
  telefone?: string;
  confirmacaoSenha?: string;
}

export interface DenunciaFormData {
  titulo: string;
  descricao: string;
}
