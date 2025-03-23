export function handleSubmitCadastro(
    e: React.FormEvent,
    validaFormulario: () => boolean,
    formData: any,
    enderecoData: any,
    onSuccess: () => void
): void {
    e.preventDefault();

    if (!validaFormulario()) {
        alert('Por favor, corrija os campos destacados.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ ...formData, ...enderecoData });
    localStorage.setItem('users', JSON.stringify(users));

    onSuccess();
}
