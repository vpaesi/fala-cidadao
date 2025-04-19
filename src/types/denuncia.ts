export interface Denuncia {
  [x: string]: any;
  titulo: string;
  id: string;
  descricao: string;
  localizacao?: string;
  imagemUrl?: string;
  dataCriacao: string;
}
