const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const templatesController = {
    criarTemplates: async (req, res) => {
        try {
            const templates = req.body;
            const novosTemplates = await prisma.templates.createMany({
                data: templates,
            });
            res.status(201).json(novosTemplates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar os templates' });
        }
    },

    consultarTemplates: async (req, res) => {
        try {
            const templates = await prisma.templates.findMany();
            res.status(200).json(templates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter os templates' });
        }
    },

    consultarTemplatesPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const template = await prisma.templates.findUnique({
                where: {
                    idtemplate: parseInt(id),
                },
            });
            if (!template) {
                return res.status(404).json({ error: 'Template não encontrado' });
            }
            res.status(200).json(template);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o template' });
        }
    },

    atualizarTemplates: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                nometemplate,
                extensaotemplate,
                data_criacao,
                statustemplate,
                qtd_colunas,
                idusuario,
            } = req.body;

            const templateAtualizado = await prisma.templates.update({
                where: {
                    idtemplate: parseInt(id),
                },
                data: {
                    nometemplate,
                    extensaotemplate,
                    data_criacao,
                    statustemplate,
                    qtd_colunas,
                    idusuario,
                },
            });

            if (!templateAtualizado) {
                return res.status(404).json({ error: 'Template não encontrado' });
            }

            res.status(200).json(templateAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o template' });
        }
    },

    deletarTemplates: async (req, res) => {
        try {
            const { id } = req.params;
            const templateExcluido = await prisma.templates.delete({
                where: {
                    idtemplate: parseInt(id),
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
    },
};

module.exports = templatesController;
