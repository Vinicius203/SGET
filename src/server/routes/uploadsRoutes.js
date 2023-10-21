const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');

// Criar novo Upload
router.post('/criarUploads', uploadsController.createUpload);

// Consultar todos os Uploads
router.get('/consultarUploads', uploadsController.getUploads);

// Consultar o Upload pelo ID
router.get('/consultarUploads/:id', uploadsController.getUploadById);

// Atualizar o Upload pelo ID
router.patch('/atualizarUploads/:id', uploadsController.updateUploadById);

// Atualizar o caminhoSalvamento do Upload pelo ID
router.put('/alterarCaminho/:id', uploadsController.updateCaminho);

// Excluir o Upload pelo ID
router.delete('/deletarUploads/:id', uploadsController.deleteUploadById);

module.exports = router;
