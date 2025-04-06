import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.includes("/api/cidades")) {
        return Promise.resolve(["Cidade1", "Cidade2"]);
      }
      return Promise.resolve([]);
    },
  })
) as jest.Mock;