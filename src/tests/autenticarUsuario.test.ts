import { autenticarUsuario } from '../util/autenticarUsuario';

describe('autenticarUsuario', () => {
  it('deve autenticar com as credenciais validas', async () => {
    const response = await autenticarUsuario('usuario@example.com', 'senha123');
    expect(response).toEqual({
      success: false,
      message: 'Usuário não cadastrado. Por favor, faça o cadastro primeiro.',
    });
  });

  it('deve falhar com as credenciais invalidas', async () => {
    const response = await autenticarUsuario('usuario@example.com', 'senhaErrada');
    expect(response).toEqual({
      success: false,
      message: 'Usuário não cadastrado. Por favor, faça o cadastro primeiro.',
    });
  });
});