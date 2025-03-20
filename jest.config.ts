export default {
  preset: 'ts-jest/presets/default-esm', // Configuração para ES Modules
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapeia estilos para evitar erros
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Configuração adicional para testes
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Trata arquivos .ts e .tsx como ES Modules
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Ativa suporte a ES Modules
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora pastas desnecessárias
};