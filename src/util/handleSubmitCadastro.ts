interface FormData {
  nome: string;
  email: string;
  senha: string;
}

interface EnderecoData {
  cep: string;
  estado: string;
  cidade: string;
}

export function handleSubmitCadastro(
  e: React.FormEvent,
  formData: FormData,
  enderecoData: EnderecoData,
  onSuccess: () => void
): void {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ ...formData, ...enderecoData });
  localStorage.setItem("users", JSON.stringify(users));

  onSuccess();
}
