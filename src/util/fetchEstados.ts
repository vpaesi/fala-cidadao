export const fetchEstados = async (): Promise<string[]> => {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();
        return data.map((estado: { sigla: string }) => estado.sigla);
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        throw error;
    }
};
