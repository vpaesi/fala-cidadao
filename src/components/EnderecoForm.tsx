import React from 'react';
import { InputField } from './InputField';

interface EnderecoFormProps {
    formData: {
        estado: string;
        cidade: string;
        rua: string;
        numero: string;
        complemento: string;
    };
    cep: string;
    cepError: string;
    estados: string[];
    cidades: string[];
    onCepChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onEstadoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onCidadeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onInputChange: (field: string, value: string) => void;
}

export const EnderecoForm: React.FC<EnderecoFormProps> = ({
    formData,
    cep,
    cepError,
    estados,
    cidades,
    onCepChange,
    onEstadoChange,
    onCidadeChange,
    onInputChange,
}) => {
    async function fetchCidades(estado: string) {
        if (!estado) return;

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

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    id="cep"
                    label="CEP"
                    type="text"
                    value={cep}
                    placeholder="Digite o CEP"
                    onChange={(e) => onCepChange(e as React.ChangeEvent<HTMLInputElement>)}
                    required
                    errorMessage={cepError}
                />
                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700" style={{}}>
                        Estado
                    </label>
                    <select
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => {
                            const estadoSelecionado = e.target.value; this
                            onEstadoChange(e);
                            fetchCidades(estadoSelecionado)
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        style={{ border: "1px solid black", padding: "0.5rem" }}
                    >
                        <option value="">Selecione o estado</option>
                        {estados.map((estado) => (
                            <option key={estado} value={estado}>
                                {estado}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div style={{ paddingTop: "0" }}>
                <div className="grid grid-cols-2 gap-4">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700" style={{}}>
                        Cidade
                    </label>
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                        Complemento (opcional)
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <select
                        id="cidade"
                        value={formData.cidade}
                        onChange={onCidadeChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        style={{ border: "1px solid black", padding: "0.5rem" }}
                    >
                        <option value="">Selecione a cidade</option>
                        {cidades.map((cidade) => (
                            <option key={cidade} value={cidade}>
                                {cidade}
                            </option>
                        ))}
                    </select>
                    <InputField
                    id="complemento"
                    label=""
                    value={formData.complemento}
                    placeholder="Ex.: Ap. 123 - Torre A"
                    onChange={(e) => onInputChange('complemento', e.target.value)}
                    style={{ border: "1px solid black", padding: "0.5rem" }}
                />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4" style={{ marginTop: "10" }}>
                <div className="col-span-3">
                    <InputField
                        id="rua"
                        label="Logradouro"
                        placeholder="Ex.: Avenida das Flores"
                        value={formData.rua}
                        onChange={() => {}}
                        readOnly
                        required
                        style={{ border: "1px solid black", padding: "0.5rem" }}
                    />
                </div>
                <div className="col-span-1">
                    <InputField
                        id="numero"
                        label="Número"
                        value={formData.numero}
                        placeholder="Ex. 321"
                        onChange={(e) => onInputChange('numero', e.target.value)}
                        style={{ border: "1px solid black", padding: "0.5rem" }}
                    />
                </div>
            </div>
        </>
    );
};
