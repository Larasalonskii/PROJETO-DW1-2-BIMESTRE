const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// conexão banco
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 🍰 LISTAR CUPCAKES
app.get('/cupcakes', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id_produto,
                nome,
                preco,
                massa,
                cobertura,
                granulado,
                quantidade_estoque
            FROM cupcakes
            ORDER BY id_produto
        `);

        res.json({
            sucesso: true,
            cupcakes: result.rows,
            quantidade: result.rows.length
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno no servidor'
        });
    }
});

// teste
app.get('/confirmar', (req, res) => {
    res.json({
        status: 'ok',
        mensagem: 'API cupcakes funcionando 🍰'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`GET /cupcakes disponível`);
});