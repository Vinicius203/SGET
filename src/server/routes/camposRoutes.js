const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

// Acesse a propriedade 'originalUrl' para obter a rota tentada
// const rotaAcessada = req.originalUrl;

// Log da rota (pode ser útil para depuração)
// console.log(`Rota acessada: ${rotaAcessada}`);

// Criar novo Campo
router.post('/criarCampos', async (req, res) => {
    try {
        console.log('Recebida solicitação POST em /criarCampos');

        const campos = req.body; // Obtenha um array de objetos de campo do corpo da solicitação

        // Tente criar os templates no banco de dados usando o método createMany
        const novosCampos = await prisma.campos.createMany({
            data: campos,
        });

        res.status(201).json(novosCampos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar os campos' });
    }
});


// Consultar todos os Campos
router.get('/consultarCampos', async (req, res) => {
    try {
        console.log('Recebida solicitação GET em /campos');

        const campos = await prisma.campos.findMany();

        // Retorna um JSON
        res.status(200).json(campos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os campos' });
    }
});


// Consultar o Campo pelo ID
router.get('/consultarCampos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const campo = await prisma.campos.findUnique({
            where: {
                idcampo: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            }
        });

        // Verifique se o campo foi encontrado
        if (!campo) {
            return res.status(404).json({ error: 'Campo não encontrado' });
        }

        res.status(200).json(campo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o campo' });
    }
});


// Atualizar o Campo pelo ID
router.patch('/atualizarCampos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nomecampo, permitenulo, tipodado } = req.body;

        // Tente atualizado o campo no banco de dados
        const campoAtualizado = await prisma.campos.update({
            where: {
                idcampo: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            },
            data: {
                nomecampo,
                permitenulo,
                tipodado
            },
        });

        // Verifique se o campo foi encontrado e atualizado
        if (!campoAtualizado) {
            return res.status(404).json({ error: 'Campo não encontrado' });
        }

        res.status(200).json(campoAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o campo' });
    }
});

// Atualizar o permiteNulo do Campo pelo ID
router.put('/alterarNulo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { novaCondicao } = req.body;

        // Verifique se a nova condição foi fornecida
        if (!novaCondicao) {
            return res.status(400).json({ error: 'A nova condição do campo (nulo ou não) deve ser fornecida' });
        }

        const camposAtualizado = await prisma.campos.update({
            where: {
                idcampo: parseInt(id)
            },
            data: {
                permitenulo: novaCondicao
            },
        });

        if (!camposAtualizado) {
            return res.status(404).json({ error: 'Campo não encontrado' });
        }

        res.status(200).json(camposAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao alterar a condição (nulo ou não) do campo' });
    }
});


// Excluir o Campo pelo ID
router.delete('/deletarCampos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const campoExcluido = await prisma.campos.delete({
            where: {
                idcampo: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            },
        });

        if (!campoExcluido) {
            return res.status(404).json({ error: 'Campo não encontrado' });
        }

        res.status(200).json({ message: 'Campo excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o campo' });
    }
});

module.exports = router;
