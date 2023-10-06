const express = require('express');
const router = express.Router();

// Rota para criar um novo usuário
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
            // O código 'P2002' indica uma violação de unicidade
            res.status(400).json({ error: 'A matrícula já está em uso.' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar o usuário' });
        }
    }
});

// Rota para obter todos os usuários (não implementada ainda)
router.get('/usuarios', (req, res) => {
    // Implemente a lógica para obter todos os usuários
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
