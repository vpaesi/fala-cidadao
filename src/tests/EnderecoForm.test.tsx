import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EnderecoForm } from '../components/EnderecoForm';

describe('EnderecoForm', () => {
  const mockProps = {
    formData: {
      estado: '',
      cidade: '',
      rua: '',
      numero: '',
      complemento: '',
    },
    cep: '',
    cepError: '',
    estados: ['SP', 'RJ'],
    cidades: ['São Paulo', 'Rio de Janeiro'],
    onCepChange: jest.fn(),
    onEstadoChange: jest.fn(),
    onCidadeChange: jest.fn(),
    onInputChange: jest.fn(),
  };

  it('deve renderizar os campos de endereço', () => {
    render(<EnderecoForm {...mockProps} />);

    expect(screen.getByLabelText('CEP')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex.: Avenida das Flores')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex. 321')).toBeInTheDocument();
  });

  it('deve chamar onCepChange ao alterar o CEP', () => {
    render(<EnderecoForm {...mockProps} />);

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    expect(mockProps.onCepChange).toHaveBeenCalledTimes(1);
  });

  it('deve exibir uma mensagem de erro para o CEP', () => {
    render(<EnderecoForm {...mockProps} cepError="CEP inválido" />);

    expect(screen.getByText('CEP inválido')).toBeInTheDocument();
  });
});