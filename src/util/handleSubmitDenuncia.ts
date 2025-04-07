import { DenunciaFormData, EnderecoData } from '../types/types';
import { Denuncia } from '../types/denuncia';

export async function handleSubmitDenuncia(
  e: React.FormEvent,
  formData: DenunciaFormData,
  enderecoData: EnderecoData,
  imagemFile: File | null,
  addDenuncia: (denuncia: Omit<Denuncia, "id" | "dataCriacao">) => Promise<void>,
  navigate: (path: string) => void
): Promise<void> {
  e.preventDefault();

  if (!enderecoData.rua || !enderecoData.estado || !enderecoData.cidade) {
    alert("Por favor, preencha o endereço completo.");
    return;
  }

  try {
    const imagemUrl = imagemFile ? URL.createObjectURL(imagemFile) : "https://picsum.photos/200/300";

    await addDenuncia({ ...formData, ...enderecoData, imagemUrl });
    navigate("/denuncias");
  } catch (error) {
    console.error("Erro ao enviar denúncia:", error);
  }
}
