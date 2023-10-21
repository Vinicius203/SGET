const express = require('express');
const router = express.Router();
const templatesController = require('../controllers/templatesController');

// Criar novo Template
router.post('/criarTemplates', templatesController.criarTemplates);

// GET All Templates
router.get('/consultarTemplates', templatesController.consultarTemplates);

// Consultar o Template pelo ID
router.get('/consultarTemplates/:id', templatesController.consultarTemplatesPorId);

// Atualizar o Template pelo ID
router.patch('/atualizarTemplates/:id', templatesController.atualizarTemplates);

// Excluir o Template pelo ID
router.delete('/deletarTemplates/:id', templatesController.deletarTemplates);

module.exports = router;
