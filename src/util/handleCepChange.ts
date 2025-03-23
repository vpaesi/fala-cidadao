import { validarCEP } from './validarCEP';
import { fetchCidades } from './fetchCidades';

export const handleCepChange = async (
    cep: string,
    setFormData: (callback: (prev: any) => any) => void,
    setCepError: (error: string) => void
): Promise<void> => {
    setFormData((prev) => ({
        ...prev,
        cep,
    }));

    if (!validarCEP(cep)) {
        setCepError('CEP inválido.');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            setCepError('CEP não encontrado.');
        } else {
            setCepError('');
            setFormData((prev) => ({
                ...prev,
                estado: data.uf,
                cidade: data.localidade,
                rua: data.logradouro,
            }));
            await fetchCidades(data.uf);
        }
    } catch {
        setCepError('Erro ao buscar o CEP.');
    }
};
