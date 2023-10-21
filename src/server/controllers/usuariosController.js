const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const usuariosController = {
    criarUsuarios: async (req, res) => {
        try {
            console.log('Recebida solicitação POST em /criarUsuarios');

            const usuarios = req.body;

            const novosUsuarios = await prisma.usuarios.createMany({
                data: usuarios,
            });

            res.status(201).json(novosUsuarios);
        } catch (error) {
            if (error.code === 'P2002' && error.meta.target.includes('matricula')) {
                res.status(400).json({ error: 'A matrícula já está em uso.' });
            } else if (error.code === 'P2002' && error.meta.target.includes('email')) {
                res.status(400).json({ error: 'O email já está em uso.' });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Erro ao criar os usuários' });
            }
        }
    },

    consultarUsuarios: async (req, res) => {
        try {
            console.log('Recebida solicitação GET em /usuarios');

            const usuarios = await prisma.usuarios.findMany();

            res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter os usuários' });
        }
    },

    consultarUsuarioPorId: async (req, res) => {
        try {
            const { id } = req.params;

            const usuario = await prisma.usuarios.findUnique({
                where: {
                    idusuario: parseInt(id)
                }
            });

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o usuário' });
        }
    },

    atualizarUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome_completo, perfilacesso, matricula, email, senha, squad, cargo } = req.body;

            const usuarioAtualizado = await prisma.usuarios.update({
                where: {
                    idusuario: parseInt(id)
                },
                data: {
                    nome_completo,
                    perfilacesso,
                    matricula,
                    email,
                    senha,
                    squad,
                    cargo,
                },
            });

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o usuário' });
        }
    },

    alterarSenha: async (req, res) => {
        try {
            const { id } = req.params;
            const { novaSenha } = req.body;

            if (!novaSenha) {
                return res.status(400).json({ error: 'A nova senha deve ser fornecida' });
            }

            const usuarioAtualizado = await prisma.usuarios.update({
                where: {
                    idusuario: parseInt(id)
                },
                data: {
                    senha: novaSenha
                },
            });

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao alterar a senha do usuário' });
        }
    },

    deletarUsuario: async (req, res) => {
        try {
            const { id } = req.params;

            const usuarioExcluido = await prisma.usuarios.delete({
                where: {
                    idusuario: parseInt(id)
                },
            });

            if (!usuarioExcluido) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o usuário' });
        }
    },
};

module.exports = usuariosController;
