import { EnderecoData } from '../types/types';

export const handleCepChange = async (
  cep: string,
  setFormData: React.Dispatch<React.SetStateAction<EnderecoData>>,
  setCepError: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  setFormData((prev) => ({ ...prev, cep }));

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      setCepError("CEP não encontrado.");
    } else {
      setCepError("");
      setFormData((prev) => ({
        ...prev,
        estado: data.uf,
        cidade: data.localidade,
        rua: data.logradouro,
      }));
    }
  } catch {
    setCepError("Erro ao buscar o CEP.");
  }
};
