const express = require('express');
const router = express.Router();
const campostemplatesController = require('../controllers/camposTemplatesController');

// Rota para adicionar uma nova associação campo-template
router.post('/adicionar', campostemplatesController.adicionarAssociacao);

// Rota para atualizar uma associação campo-template por ID
router.put('/atualizar/:id', campostemplatesController.atualizarAssociacao);

// Rota para remover uma associação campo-template por ID
router.delete('/remover/:id', campostemplatesController.removerAssociacao);

// Rota para buscar todas as associações de um campo específico
router.get('/:idcampo', campostemplatesController.buscarAssociacoesPorCampo);

// Rota para buscar todas as associações de um template específico
router.get('/template/:idtemplate', campostemplatesController.buscarAssociacoesPorTemplate);

module.exports = router;
