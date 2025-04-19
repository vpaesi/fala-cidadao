import { validarCPF } from '../util/validarCPF';

describe('validarCPF', () => {
  it('should return true for a valid CPF', () => {
    expect(validarCPF('123.456.789-09')).toBe(true);
  });

  it('should return false for an invalid CPF', () => {
    expect(validarCPF('123.456.789-00')).toBe(false);
  });
});