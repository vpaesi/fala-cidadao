import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../components/InputField';

describe('InputField', () => {
  it('deve renderizar o rótulo e o campo de entrada', () => {
    render(
      <InputField
        id="nome"
        label="Nome"
        value=""
        placeholder="Digite seu nome"
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  it('deve chamar a função onChange ao digitar no campo', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        id="nome"
        label="Nome"
        value=""
        placeholder="Digite seu nome"
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText('Digite seu nome');
    fireEvent.change(input, { target: { value: 'João' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve exibir uma mensagem de erro quando fornecida', () => {
    render(
      <InputField
        id="nome"
        label="Nome"
        value=""
        placeholder="Digite seu nome"
        onChange={() => {}}
        errorMessage="Erro no campo"
      />
    );

    expect(screen.getByText('Erro no campo')).toBeInTheDocument();
  });
});