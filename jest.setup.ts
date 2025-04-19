import '@testing-library/jest-dom';

global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.includes('/api/cidades')) {
        return Promise.resolve([{ nome: 'Cidade1' }, { nome: 'Cidade2' }]);
      }
      if (url.includes('/api/estados')) {
        return Promise.resolve([{ sigla: 'SP' }, { sigla: 'RJ' }]);
      }
      if (url.includes('viacep.com.br')) {
        return Promise.resolve({
          uf: 'SP',
          localidade: 'São Paulo',
          logradouro: 'Rua Exemplo',
        });
      }
      return Promise.resolve([]);
    },
  })
) as jest.Mock;
