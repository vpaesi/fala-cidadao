import { renderHook, act } from '@testing-library/react';
import { useEndereco } from '../hooks/useEndereco';

describe('useEndereco', () => {
  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useEndereco());

    expect(result.current.estados).toEqual([]);
    expect(result.current.cidades).toEqual([]);
    expect(result.current.cepError).toBe('');
    expect(result.current.formData).toEqual({
      cep: '',
      estado: '',
      cidade: '',
      rua: '',
      numero: '',
      complemento: '',
    });
  });

  it('deve atualizar o CEP e buscar dados de endereço', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            uf: 'SP',
            localidade: 'São Paulo',
            logradouro: 'Rua Exemplo',
          }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useEndereco());

    await act(async () => {
      await result.current.handleCepChange('12345678');
    });

    expect(result.current.formData.cep).toBe('12345678');
    expect(result.current.formData.estado).toBe('SP');
    expect(result.current.formData.cidade).toBe('São Paulo');
    expect(result.current.formData.rua).toBe('Rua Exemplo');
  });
});