const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Criar novo Usuário
router.post('/criarUsuarios', usuariosController.criarUsuarios);

// Consultar todos os Usuários
router.get('/consultarUsuarios', usuariosController.consultarUsuarios);

// Consultar o Usuário pelo ID
router.get('/consultarUsuarios/:id', usuariosController.consultarUsuarioPorId);

// Atualizar o Usuário pelo ID
router.patch('/atualizarUsuarios/:id', usuariosController.atualizarUsuario);

// Atualizar a SENHA do Usuário pelo ID
router.put('/alterarSenha/:id', usuariosController.alterarSenha);

// Excluir o Usuário pelo ID
router.delete('/deletarUsuarios/:id', usuariosController.deletarUsuario);

module.exports = router;
