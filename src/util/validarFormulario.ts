import { ehMaiorDeIdade } from '../util/validarIdade';
import { validarCPF } from '../util/validarCPF';
import { validarSenha } from '../util/validarSenha';
import { validarTelefone } from '../util/validarTelefone';

export function validarFormulario(
    formData: { nome: string; dob: string; cpf: string; telefone: string; email: string; senha: string; confirmacaoSenha: string; },
    enderecoData: { cep: string; estado: string; cidade: string; rua: string; numero: string; complemento: string; },
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string; }>>
) {
    return () => {
        const newErrors: { [key: string]: string; } = {};

        if (!formData.nome.trim()) newErrors.nome = 'O campo Nome é obrigatório.';
        if (!formData.dob.trim()) {
            newErrors.dob = 'O campo Data de Nascimento é obrigatório.';
        } else if (!ehMaiorDeIdade(formData.dob)) {
            newErrors.dob = 'O usuário deve ser maior de idade.';
        }
        if (!formData.cpf.trim()) {
            newErrors.cpf = 'O campo CPF é obrigatório.';
        } else if (!validarCPF(formData.cpf)) {
            newErrors.cpf = 'O CPF informado não é válido.';
        }
        if (!formData.telefone.trim()) {
            newErrors.telefone = 'O campo Telefone é obrigatório.';
        } else if (!validarTelefone(formData.telefone)) {
            newErrors.telefone = 'O número de celular deve conter no mínimo o DDD + 8 dígitos.';
        }
        if (!formData.email.trim()) newErrors.email = 'O campo E-mail é obrigatório.';
        if (!formData.senha.trim()) {
            newErrors.senha = 'O campo Senha é obrigatório.';
        } else if (!validarSenha(formData.senha)) {
            newErrors.senha = 'A senha deve conter no mínimo 6 caracteres.';
        }
        if (!formData.confirmacaoSenha.trim()) {
            newErrors.confirmacaoSenha = 'O campo Confirmação de Senha é obrigatório.';
        } else if (formData.senha !== formData.confirmacaoSenha) {
            newErrors.confirmacaoSenha = 'As senhas não coincidem.';
        }

        if (!enderecoData.estado.trim()) newErrors.estado = 'O campo Estado é obrigatório.';
        if (!enderecoData.cidade.trim()) newErrors.cidade = 'O campo Cidade é obrigatório.';
        if (!enderecoData.rua.trim()) newErrors.rua = 'O campo Logradouro é obrigatório.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
}
