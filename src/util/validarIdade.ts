export function ehMaiorDeIdade(dataNascimento: string): boolean {
    const data = new Date(dataNascimento);
    const dataAtual = new Date();
    const dataMais18 = new Date(
      data.getUTCFullYear() + 18,
      data.getUTCMonth(),
      data.getUTCDate()
    );
  
    return dataAtual >= dataMais18;
  }