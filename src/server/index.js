const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
    console.log(`Recebida (index) solicitação ${req.method} em ${req.path}`);
    next();
});

app.use(express.json());

// Caminho da rota de Usuários
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

// Caminho da rota de Templates
const templatesRoutes = require('./routes/templatesRoutes');
app.use('/templates', templatesRoutes);

// Caminho da rota de Campos
const camposRoutes = require('./routes/camposRoutes');
app.use('/campos', camposRoutes);

// Caminho da rota de Uploads
const uploadsRoutes = require('./routes/uploadsRoutes');
app.use('/uploads', uploadsRoutes);

// Caminho da rota de CamposTemplates
const camposTemplatesRoutes = require('./routes/camposTemplatesRoutes');
app.use('/camposTemplates', camposTemplatesRoutes);


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
