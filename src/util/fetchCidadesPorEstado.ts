export async function fetchCidadesPorEstado(
    estado: string,
    onInputChange: (field: string, value: string) => void
): Promise<void> {
    try {
        const response = await fetch(`/api/cidades?estado=${estado}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar cidades');
        }
        const cidades = await response.json();
        onInputChange('cidade', '');
        onInputChange('cidades', cidades);
    } catch (error) {
        console.error('Erro ao carregar cidades:', error);
    }
}
