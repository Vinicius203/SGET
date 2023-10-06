const express = require('express');
const router = express.Router();

// Post New User
router.post('/templates', async (req, res) => {
    try {
        console.log('Recebida solicitação POST em /templates');

        const { nometemplate, extensaotemplate, data_criacao, statustemplates, qtd_colunas, idusuario } = req.body;

        // Cria o Template no Banco de Dados
        const novoTemplate = await prisma.templates.create({
            data: {
                nometemplate,
                extensaotemplate,
                data_criacao,
                statustemplates,
                qtd_colunas,
                idusuario
            },
        });

        res.status(201).json(novoTemplate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
});

// GET All Templates
router.get('/templates', async (req, res) => {
    try {
        console.log('Recebida solicitação GET em /templates');

        const usuarios = await prisma.templates.findMany();

        // Retorna um JSON
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os templates' });
    }
});

module.exports = router;
