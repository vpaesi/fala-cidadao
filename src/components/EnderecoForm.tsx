import React from 'react';
import { InputField } from './InputField';
import { fetchCidades } from "../util/fetchCidades";

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
  onCepChange: (cep: string) => void;
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
  const handleEstadoChange = async (estado: string) => {
    try {
      const cidades = await fetchCidades(estado);
      onInputChange("cidade", ""); // Limpa a cidade selecionada
      onEstadoChange({ target: { value: estado } } as React.ChangeEvent<HTMLSelectElement>);
      onInputChange("cidades", cidades.join(", "));
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  return (
    <>
      <div className="grid">
        <h2
          style={{
            marginTop: '2rem',
            marginBottom: '1rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid rgb(121, 121, 122)',
          }}
        >
          Endereço
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="cep"
            label="CEP"
            type="text"
            value={cep}
            placeholder="Digite o CEP"
            onChange={(e) => onCepChange(e.target.value)}
            required
            errorMessage={cepError}            
          />
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.875rem',
              color: '#007bff',
              textDecoration: 'underline',
              margin: '0',
              display: 'block',
              marginTop: '-0.5rem',
              marginBottom: '1rem',
            }}
          >
            Descubra seu CEP
          </a>
        </div>
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            id="estado"
            value={formData.estado}
            onChange={(e) => {
              const estadoSelecionado = e.target.value;
              onEstadoChange(e);
              handleEstadoChange(estadoSelecionado)
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            style={{ height: '2.5rem', border: "1px solid black", padding: "0.5rem" }}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <select
            id="cidade"
            value={formData.cidade}
            onChange={onCidadeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            style={{ height: '2.5rem', border: "1px solid black", padding: "0.5rem" }}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>
        <InputField
          id="complemento"
          label="Complemento (opcional)"
          value={formData.complemento}
          placeholder="Ex.: Ap. 123 - Torre A"
          onChange={(e) => onInputChange('complemento', e.target.value)}
          style={{ border: "1px solid black", padding: "0.5rem" }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4" style={{ marginTop: "10" }}>
        <div className="col-span-3">
          <InputField
            id="rua"
            label="Logradouro"
            placeholder="Ex.: Avenida das Flores"
            value={formData.rua}
            onChange={() => { }}
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
