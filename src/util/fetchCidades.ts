export async function fetchCidades(estado: string): Promise<string[]> {
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
    if (!response.ok) throw new Error("Erro ao buscar cidades");
    const data = await response.json();
    return data.map((cidade: { nome: string }) => cidade.nome);
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    throw error;
  }
}
