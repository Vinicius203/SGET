const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

// Post New User
router.post('/usuarios', async (req, res) => {
    try {
        console.log('Recebida solicitação POST em /usuarios');

        const { nome_completo, perfilacesso, matricula, email, senha, squad, cargo } = req.body;

        // Tente criar o usuário no banco de dados
        const novoUsuario = await prisma.usuarios.create({
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

        res.status(201).json(novoUsuario);
    } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('matricula')) {
            // O código 'P2002' indica uma violação de duplicata de campo único
            res.status(400).json({ error: 'A matrícula já está em uso.' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar o usuário' });
        }
    }
});


// Rota para obter todos os usuários (não implementada ainda)
router.get('/usuarios', (req, res) => {
    
=======
// GET All Users
router.get('/usuarios', async (req, res) => {
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


// Rota para obter um usuário pelo ID (não implementada ainda)
router.get('/usuarios/:id', (req, res) => {
    // Implemente a lógica para obter um usuário pelo ID
});

// Rota para atualizar um usuário pelo ID (não implementada ainda)
router.put('/usuarios/:id', (req, res) => {
    // Implemente a lógica para atualizar um usuário pelo ID
});

// Rota para excluir um usuário pelo ID (não implementada ainda)
router.delete('/usuarios/:id', (req, res) => {
    // Implemente a lógica para excluir um usuário pelo ID
});

module.exports = router;
