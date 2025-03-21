import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Retorna um array vazio como padrão
  })
) as jest.Mock;