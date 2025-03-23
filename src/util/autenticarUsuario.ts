export function autenticarUsuario(
    email: string,
    senha: string
): { success: boolean; user?: any; message?: string } {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(
        (user: { email: string; senha: string }) =>
            user.email === email && user.senha === senha
    );

    if (userExists) {
        return { success: true, user: userExists };
    } else {
        return { success: false, message: 'Usuário não cadastrado. Por favor, faça o cadastro primeiro.' };
    }
}
