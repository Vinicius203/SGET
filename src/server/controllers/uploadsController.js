const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadsController = {
    createUpload: async (req, res) => {
        try {
            const uploads = req.body;
            const novosUploads = await prisma.uploads.createMany({
                data: uploads,
            });
            res.status(201).json(novosUploads);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar os uploads' });
        }
    },

    getUploads: async (req, res) => {
        try {
            const uploads = await prisma.uploads.findMany();
            res.status(200).json(uploads);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter os uploads' });
        }
    },

    getUploadById: async (req, res) => {
        try {
            const { id } = req.params;
            const upload = await prisma.uploads.findUnique({
                where: {
                    idupload: parseInt(id)
                }
            });
            if (!upload) {
                return res.status(404).json({ error: 'Upload não encontrado' });
            }
            res.status(200).json(upload);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o upload' });
        }
    },

    updateUploadById: async (req, res) => {
        try {
            const { id } = req.params;
            const { nomeupload, caminhosalvamento, data_upload, idtemplate, idusuario } = req.body;
            const uploadAtualizado = await prisma.uploads.update({
                where: {
                    idupload: parseInt(id)
                },
                data: {
                    nomeupload,
                    caminhosalvamento,
                    data_upload,
                    idtemplate,
                    idusuario
                },
            });
            if (!uploadAtualizado) {
                return res.status(404).json({ error: 'Upload não encontrado' });
            }
            res.status(200).json(uploadAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o upload' });
        }
    },

    updateCaminho: async (req, res) => {
        try {
            const { id } = req.params;
            const { novoCaminho } = req.body;
            if (!novoCaminho) {
                return res.status(400).json({ error: 'O novo caminho de salvamento do upload deve ser fornecido!' });
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
    },

    deleteUploadById: async (req, res) => {
        try {
            const { id } = req.params;
            const uploadExcluido = await prisma.uploads.delete({
                where: {
                    idupload: parseInt(id)
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
    }
};

module.exports = uploadsController;
