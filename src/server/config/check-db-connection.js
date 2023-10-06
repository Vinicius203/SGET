const path = require('path');
const dotenv = require('dotenv');

// Especifique o caminho completo para o arquivo .env na pasta config
const envFilePath = path.resolve(__dirname, 'C:\\Users\\980197\\Desktop\\SGET\\src\\server\\config\\.env');

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config({ path: envFilePath });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

