export function validarTelefone(celular: string): boolean {
  const celularLimpo = celular.replace(/\D/g, '');
  return celularLimpo.length >= 10;
}
