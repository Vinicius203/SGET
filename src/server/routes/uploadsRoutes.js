const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

// Acesse a propriedade 'originalUrl' para obter a rota tentada
// const rotaAcessada = req.originalUrl;

// Log da rota (pode ser útil para depuração)
// console.log(`Rota acessada: ${rotaAcessada}`);

// Criar novo Upload
router.post('/criarUploads', async (req, res) => {
    try {
        console.log('Recebida solicitação POST em /criarUploads');

        const uploads = req.body; // Obtenha um array de objetos de campo do corpo da solicitação

        // Tente criar os templates no banco de dados usando o método createMany
        const novosUploads = await prisma.uploads.createMany({
            data: uploads,
        });

        res.status(201).json(novosUploads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar os uploads' });
    }
});


// Consultar todos os Uploads
router.get('/consultarUploads', async (req, res) => {
    try {
        console.log('Recebida solicitação GET em /uploads');

        const uploads = await prisma.uploads.findMany();

        // Retorna um JSON
        res.status(200).json(uploads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os uploads' });
    }
});


// Consultar o Upload pelo ID
router.get('/consultarUploads/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const upload = await prisma.uploads.findUnique({
            where: {
                idupload: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            }
        });

        // Verifique se o campo foi encontrado
        if (!upload) {
            return res.status(404).json({ error: 'Upload não encontrado' });
        }

        res.status(200).json(upload);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o upload' });
    }
});


// Atualizar o Upload pelo ID
router.patch('/atualizarUploads/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeupload, caminhosalvamento, data_upload, idtemplate, idusuario } = req.body;

        // Tente atualizar o upload no Banco de Dados
        const uploadAtualizado = await prisma.uploads.update({
            where: {
                idupload: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            },
            data: {
                nomeupload,
                caminhosalvamento,
                data_upload,
                idtemplate,
                idusuario
            },
        });

        // Verifique se o upload foi encontrado e atualizado
        if (!uploadAtualizado) {
            return res.status(404).json({ error: 'Upload não encontrado' });
        }

        res.status(200).json(uploadAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o upload' });
    }
});

// Atualizar o caminhoSalvamento do Upload pelo ID
router.put('/alterarCaminho/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { novoCaminho } = req.body;

        // Verifique se o novo caminho foi fornecido
        if (!novoCaminho) {
            return res.status(400).json({ error: 'A novo caminho de salvamento do upload deve ser fornecido!' });
        }

        const uploadsAtualizado = await prisma.uploads.update({
            where: {
                idupload: parseInt(id)
            },
            data: {
                caminhosalvamento: novoCaminho
            },
        });

        if (!uploadsAtualizado) {
            return res.status(404).json({ error: 'Upload não encontrado' });
        }

        res.status(200).json(uploadsAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao alterar o caminho de salvamento do upload' });
    }
});


// Excluir o Upload pelo ID
router.delete('/deletarUploads/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const uploadExcluido = await prisma.uploads.delete({
            where: {
                idupload: parseInt(id) // Certifique-se de converter o parâmetro de ID para um número inteiro
            },
        });

        if (!uploadExcluido) {
            return res.status(404).json({ error: 'Upload não encontrado' });
        }

        res.status(200).json({ message: 'Upload excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o upload' });
    }
});

module.exports = router;
