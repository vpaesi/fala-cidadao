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
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    id="cep"
                    label="CEP"
                    type="text"
                    value={cep}
                    placeholder="Digite o CEP"
                    onChange={onCepChange}
                    required
                    style={{ border: "1px solid black", padding: "0.5rem" }}
                    errorMessage={cepError}
                />
                <InputField
                    id="rua"
                    label="Logradouro"
                    placeholder='Avenida das Flores'
                    value={formData.rua}
                    onChange={() => { }}
                    readOnly
                    required
                    style={{ border: "1px solid black", padding: "0.5rem" }}
                />
            </div>

            <div style={{ paddingTop: "0" }}>
                <div className="grid grid-cols-2 gap-4">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700" style={{}}>
                        Estado
                    </label>
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                        Cidade
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <select
                        id="estado"
                        value={formData.estado}
                        onChange={onEstadoChange}
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
                </div>
            </div>


            <div className="grid grid-cols-2 gap-4" style={{ marginTop: "10" }}>
                <InputField
                    id="numero"
                    label="Número"
                    value={formData.numero}
                    placeholder="Digite o número"
                    onChange={(e) => onInputChange('numero', e.target.value)}
                    style={{ border: "1px solid black", padding: "0.5rem" }}
                />
                <InputField
                    id="complemento"
                    label="Complemento (opcional)"
                    value={formData.complemento}
                    placeholder="Digite o complemento"
                    onChange={(e) => onInputChange('complemento', e.target.value)}
                    style={{ border: "1px solid black", padding: "0.5rem" }}
                />
            </div>
        </>
    );
};