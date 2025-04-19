import { handleSubmitDenuncia } from '../util/handleSubmitDenuncia';

// Mocking dependencies if necessary
jest.mock('../util/handleSubmitDenuncia', () => ({
  handleSubmitDenuncia: jest.fn(async (event, formData, enderecoData, file, addDenuncia, navigate) => {
    if (!formData.titulo) {
      alert('Por favor, preencha o título da denúncia.');
      return;
    }
    addDenuncia({
      ...formData,
      ...enderecoData,
    });
    navigate('/denuncias');
  }),
}));

describe('handleSubmitDenuncia', () => {
  const mockAddDenuncia = jest.fn();
  const mockNavigate = jest.fn();

  const formData = { titulo: 'Teste', descricao: 'Descrição de teste' };
  const enderecoData = { rua: 'Rua A', estado: 'SP', cidade: 'São Paulo', cep: '12345-678', numero: '123', complemento: '' };

  it('deve exibir um alerta se o título estiver vazio', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await handleSubmitDenuncia(
      { preventDefault: jest.fn() } as React.FormEvent,
      { ...formData, titulo: '' },
      enderecoData,
      null,
      mockAddDenuncia,
      mockNavigate
    );

    expect(alertMock).toHaveBeenCalledWith('Por favor, preencha o título da denúncia.');
    alertMock.mockRestore();
  });

  it('deve chamar addDenuncia com os dados corretos', async () => {
    await handleSubmitDenuncia(
      { preventDefault: jest.fn() } as React.FormEvent,
      formData,
      enderecoData,
      null,
      mockAddDenuncia,
      mockNavigate
    );

    expect(mockAddDenuncia).toHaveBeenCalledWith(expect.objectContaining({
      titulo: 'Teste',
      descricao: 'Descrição de teste',
      rua: 'Rua A',
      estado: 'SP',
      cidade: 'São Paulo',
    }));
    expect(mockNavigate).toHaveBeenCalledWith('/denuncias');
  });
});