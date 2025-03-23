export const fetchCidades = async (estado: string): Promise<string[]> => {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
        const data = await response.json();

        if (Array.isArray(data)) {
            return data.map((cidade: { nome: string }) => cidade.nome);
        } else {
            throw new Error('Resposta inesperada da API');
        }
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        throw error;
    }
};
