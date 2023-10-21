const express = require('express');
const router = express.Router();
const camposController = require('../controllers/camposController');

// Criar novo Campo
router.post('/criarCampos', camposController.criarCampos);

// GET All Campos
router.get('/consultarCampos', camposController.consultarCampos);

// Consultar o Campo pelo ID
router.get('/consultarCampos/:id', camposController.consultarCamposPorId);

// Atualizar o Campo pelo ID
router.patch('/atualizarCampos/:id', camposController.atualizarCampos);

// Atualizar o permiteNulo do Campo pelo ID
router.put('/alterarNulo/:id', camposController.alterarNulo);

// Excluir o Campo pelo ID
router.delete('/deletarCampos/:id', camposController.deletarCampos);

module.exports = router;
