const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para adicionar várias associações campo-template
const adicionarAssociacao = async (req, res) => {
    try {
        const associacoes = req.body; // Receba as associações do corpo da solicitação

        const novasAssociacoes = await Promise.all(
            associacoes.map(async (associacao) => {
                const { idcampo, idtemplate } = associacao;

                // Verifique se os campos e templates existem
                const campo = await prisma.campos.findUnique({
                    where: { idcampo },
                });
                const template = await prisma.templates.findUnique({
                    where: { idtemplate },
                });

                if (!campo || !template) {
                    // Se um campo ou template não for encontrado, retorne um erro
                    throw new Error('Campo ou template não encontrado');
                }

                // Crie a associação na tabela de junção
                const novaAssociacao = await prisma.campostemplates.create({
                    data: {
                        idcampo,
                        idtemplate,
                    },
                });

                return novaAssociacao;
            })
        );

        res.status(201).json(novasAssociacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao adicionar associações campo-template' });
    }
};

// Controlador para atualizar uma associação campo-template por ID
const atualizarAssociacao = async (req, res) => {
    try {
        const { id } = req.params;
        const { idcampo, idtemplate } = req.body;

        const associacaoAtualizada = await prisma.campostemplates.update({
            where: { id },
            data: {
                idcampo,
                idtemplate,
            },
        });

        res.status(200).json(associacaoAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar associação campo-template' });
    }
};

// Controlador para remover uma associação campo-template por ID
const removerAssociacao = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.campostemplates.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Associação campo-template removida com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao remover associação campo-template' });
    }
};

// Controlador para buscar todas as associações de um campo específico
const buscarAssociacoesPorCampo = async (req, res) => {
    try {
        const { idcampo } = req.params;

        const associacoes = await prisma.campostemplates.findMany({
            where: { idcampo: parseInt(idcampo) },
        });

        res.status(200).json(associacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar associações de campo específico' });
    }
};

// Controlador para buscar todas as associações de um template específico
const buscarAssociacoesPorTemplate = async (req, res) => {
    try {
        const { idtemplate } = req.params;

        const associacoes = await prisma.campostemplates.findMany({
            where: { idtemplate: parseInt(idtemplate) },
        });

        res.status(200).json(associacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar associações de template específico' });
    }
};

module.exports = {
    adicionarAssociacao,
    atualizarAssociacao,
    removerAssociacao,
    buscarAssociacoesPorCampo,
    buscarAssociacoesPorTemplate,
};
