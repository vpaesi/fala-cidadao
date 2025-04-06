import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
        estados: ['SP', 'RJ', 'MG'],
        cidades: ['São Paulo', 'Rio de Janeiro'],
        onCepChange: jest.fn(),
        onEstadoChange: jest.fn(),
        onCidadeChange: jest.fn(),
        onInputChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render all input fields and dropdowns', () => {
        render(<EnderecoForm {...mockProps} />);

        expect(screen.getByLabelText('CEP')).toBeInTheDocument();
        expect(screen.getByLabelText('Estado')).toBeInTheDocument();
        expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ex.: Avenida das Flores')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ex. 321')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ex.: Ap. 123 - Torre A')).toBeInTheDocument();
    });

    it('should call onCepChange when typing in the CEP field', () => {
        render(<EnderecoForm {...mockProps} />);

        const cepInput = screen.getByLabelText('CEP');
        fireEvent.change(cepInput, { target: { value: '12345-678' } });

        expect(mockProps.onCepChange).toHaveBeenCalledTimes(1);
    });

    it('should call onInputChange when typing in the complemento field', () => {
        render(<EnderecoForm {...mockProps} />);

        const complementoInput = screen.getByPlaceholderText('Ex.: Ap. 123 - Torre A');
        fireEvent.change(complementoInput, { target: { value: 'Apto 101' } });

        expect(mockProps.onInputChange).toHaveBeenCalledWith('complemento', 'Apto 101');
    });

    it('should display an error message for CEP when provided', () => {
        render(<EnderecoForm {...mockProps} cepError="CEP inválido" />);

        expect(screen.getByText('CEP inválido')).toBeInTheDocument();
    });

    it('should not call fetchCidades if no state is selected', async () => {
        render(<EnderecoForm {...mockProps} />);

        const estadoSelect = screen.getByLabelText('Estado');
        fireEvent.change(estadoSelect, { target: { value: '' } });

        expect(mockProps.onEstadoChange).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(mockProps.onInputChange).not.toHaveBeenCalledWith('cidade', '');
        });
    });

    it('should handle API errors gracefully when fetching cities', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<EnderecoForm {...mockProps} />);

        const estadoSelect = screen.getByLabelText('Estado');
        fireEvent.change(estadoSelect, { target: { value: 'SP' } });

        await waitFor(() => {
            expect(consoleErrorMock).toHaveBeenCalledWith(
                'Erro ao carregar cidades:',
                expect.any(Error)
            );
        });

        consoleErrorMock.mockRestore();
        jest.restoreAllMocks();
    });
});