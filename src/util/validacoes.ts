export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  const numerosRepetidos = new Set([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]);
  if (numerosRepetidos.has(cpf)) return false;

  const validarDigito = (tamanho: number) => {
    let soma = 0;
    let multiplicador = tamanho + 1;

    for (let i = 0; i < tamanho; i++) {
      soma += parseInt(cpf[i]) * multiplicador--;
    }

    soma = (soma * 10) % 11;
    return soma === 10 || soma === 11 ? 0 : soma;
  };

  const primeiroDigito = validarDigito(9);
  const segundoDigito = validarDigito(10);

  return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10]);
}

export function validarTelefone(telefone: string): boolean {
  const apenasNumeros = telefone.replace(/\D/g, '');

  const numerosRepetidos = new Set([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]);

  return apenasNumeros.length >= 10 && apenasNumeros.length <= 11 && !numerosRepetidos.has(apenasNumeros);
}

export function validarNome(nome: string): boolean {
  return /^[a-zA-Z\s]+$/.test(nome.trim());
}

export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.includes('.com');
}

export { ehMaiorDeIdade } from './validarIdade';