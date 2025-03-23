export function validarTelefone(celular: string): boolean {
    const celularLimpo = celular.replace(/\D/g, ''); // Remove caracteres não numéricos
    return celularLimpo.length >= 10; // Verifica se tem pelo menos 10 dígitos
  }