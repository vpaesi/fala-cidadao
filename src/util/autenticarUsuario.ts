interface User {
  email: string;
  senha: string;
}

export function autenticarUsuario(email: string, senha: string): { success: boolean; user?: User; message?: string } {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = users.find((user) => user.email === email && user.senha === senha);

  if (userExists) {
    return { success: true, user: userExists };
  } else {
    return { success: false, message: "Usuário não cadastrado. Por favor, faça o cadastro primeiro." };
  }
}
