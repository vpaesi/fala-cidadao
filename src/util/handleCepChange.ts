import { EnderecoData } from '../types/types';
import { validarCEP } from './validarCEP';

export const handleCepChange = async (
  cep: string,
  setFormData: React.Dispatch<React.SetStateAction<EnderecoData>>,
  setCepError: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  setFormData((prev) => ({ ...prev, cep }));

  if (!validarCEP(cep)) {
    setCepError("CEP inválido.");
    return;
  }

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
