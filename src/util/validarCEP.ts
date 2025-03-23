export function validarCEP(cep: string): boolean {
    const cepLimpo = cep.replace(/\D/g, '');
    return /^[0-9]{8}$/.test(cepLimpo);
}
