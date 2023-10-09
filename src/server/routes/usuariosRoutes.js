const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

// Acesse a propriedade 'originalUrl' para obter a rota tentada
// const rotaAcessada = req.originalUrl;

// Log da rota (pode ser útil para depuração)
// console.log(`Rota acessada: ${rotaAcessada}`);

const prisma = new PrismaClient

// Criar novo Usuário
router.post('/criarUsuarios', async (req, res) => {
    try {
        console.log('Recebida solicitação POST em /criarUsuarios');

        const usuarios = req.body; // Obtenha um array de objetos de usuário do corpo da solicitação

        // Tente criar os usuários no banco de dados usando o método createMany
        const novosUsuarios = await prisma.usuarios.createMany({
            data: usuarios,
        });

        res.status(201).json(novosUsuarios);
    } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('matricula')) {
            // O código 'P2002' indica uma violação de duplicata de campo único
            res.status(400).json({ error: 'A matrícula já está em uso.' });
        }
        else if (error.code === 'P2002' && error.meta.target.includes('email')) {
            res.status(400).json({ error: 'O email já está em uso.' });
        }
        else {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar os usuários' });
        }
    }
});


// Consultar todos os Usuários
router.get('/consultarUsuarios', async (req, res) => {
    try {
        console.log('Recebida solicitação GET em /usuarios');

        const usuarios = await prisma.usuarios.findMany();

        // Retorna um JSON
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os usuários' });
    }
});


// Consultar usuário pelo ID
router.get('/consultarUsuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuarios.findUnique({
            where: {
                idusuario: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            }
        });

        // Verifique se o usuário foi encontrado
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
});


// Atualizar o Usuário pelo ID
router.patch('/atualizarUsuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_completo, perfilacesso, matricula, email, senha, squad, cargo } = req.body;

        // Tente atualizar o usuário no banco de dados
        const usuarioAtualizado = await prisma.usuarios.update({
            where: {
                idusuario: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
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

        // Verifique se o usuário foi encontrado e atualizado
        if (!usuarioAtualizado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
});

// Atualizar SENHA do Usuário pelo ID
router.put('/alterarSenha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { novaSenha } = req.body;

        // Verifique se a nova senha foi fornecida
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
});


// Excluir Usuário pelo ID
router.delete('/deletarUsuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioExcluido = await prisma.usuarios.delete({
            where: {
                idusuario: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
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
});

module.exports = router;
