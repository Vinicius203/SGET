const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para registrar solicitações recebidas
app.use((req, res, next) => {
    console.log(`Recebida aa solicitação ${req.method} em ${req.path}`);
    next();
});

app.use(express.json());

const prisma = new PrismaClient();

// Importar as rotas de usuários
const usuariosRoutes = require('../server/routes/usuariosRoutes');

// Usar as rotas de usuários com o prefixo "/usuarios"
app.use('/usuarios', usuariosRoutes);

// Rota para a raiz ("/")
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
