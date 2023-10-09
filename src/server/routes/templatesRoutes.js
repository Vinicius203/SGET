const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

// Acesse a propriedade 'originalUrl' para obter a rota tentada
// const rotaAcessada = req.originalUrl;

// Log da rota (pode ser útil para depuração)
// console.log(`Rota acessada: ${rotaAcessada}`);

// Criar novo Template
router.post('/criarTemplates', async (req, res) => {
    try {
        console.log('Recebida solicitação POST em /templates');

        const templates = req.body; // Obtenha um array de objetos de usuário do corpo da solicitação

        // Tente criar os usuários no banco de dados usando o método createMany
        const novosTemplates = await prisma.templates.createMany({
            data: templates,
        });

        res.status(201).json(novosTemplates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar os templates' });
    }
});

// GET All Templates
router.get('/consultarTemplates', async (req, res) => {
    try {
        console.log('Recebida solicitação GET em /templates');

        const templates = await prisma.templates.findMany();

        // Retorna um JSON
        res.status(200).json(templates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os templates' });
    }
});

// Consultar o Template pelo ID
router.get('/consultarTemplates/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const template = await prisma.templates.findUnique({
            where: {
                idtemplate: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            }
        });

        // Verifique se o usuário foi encontrado
        if (!template) {
            return res.status(404).json({ error: 'Template não encontrado' });
        }

        res.status(200).json(template);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o template' });
    }
});

// Atualizar o Template pelo ID
router.patch('/atualizarTemplates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nometemplate, extensaotemplate, data_criacao, statustemplate, qtd_colunas, idusuario } = req.body;

        // Tente atualizar o usuário no banco de dados
        const templateAtualizado = await prisma.templates.update({
            where: {
                idtemplate: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            },
            data: {
                nometemplate,
                extensaotemplate,
                data_criacao,
                statustemplate,
                qtd_colunas,
                idusuario
            },
        });

        // Verifique se o usuário foi encontrado e atualizado
        if (!templateAtualizado) {
            return res.status(404).json({ error: 'Template não encontrado' });
        }

        res.status(200).json(templateAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o template' });
    }
});

// Excluir o Template pelo ID
router.delete('/deletarTemplates/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const templateExcluido = await prisma.templates.delete({
            where: {
                idtemplate: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            },
        });

        if (!templateExcluido) {
            return res.status(404).json({ error: 'Template não encontrado' });
        }

        res.status(200).json({ message: 'Template excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o template' });
    }
});

module.exports = router;
