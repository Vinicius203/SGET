const express = require('express');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
    console.log(`Recebida (index) solicitação ${req.method} em ${req.path}`);
    next();
});

app.use(express.json());

// Caminho da rota de Usuários
const usuariosRoutes = require('C:\\Users\\980197\\Desktop\\SGET\\src\\server\\routes\\usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

const templatesRoutes = require('C:\\Users\\980197\\Desktop\\SGET\\src\\server\\routes\\templatesRoutes');
app.use('/templates', templatesRoutes);

// Raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});
