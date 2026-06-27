const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);

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

pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err.message);
    } else {
        console.log('Banco conectado com sucesso!');
        release();
    }
});

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// IMAGENS
app.get('/fotos/:arquivo', (req, res) => {
    const caminho = path.join(__dirname, req.params.arquivo);
    console.log('Servindo imagem:', caminho);
    if (fs.existsSync(caminho)) {
        res.sendFile(caminho);
    } else {
        console.log('Arquivo não encontrado:', caminho);
        res.status(404).send('Imagem não encontrada');
    }
});

// 🍰 ROTA 1 — LISTAR TODOS OS CUPCAKES
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
                quantidade_estoque,
                imagem
            FROM cupcakes
            ORDER BY id_produto
        `);

        res.json({
            sucesso: true,
            cupcakes: result.rows,
            quantidade: result.rows.length
        });

    } catch (err) {
        console.error('ERRO DETALHADO:', err.message);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno no servidor'
        });
    }
});

// 🍰 ROTA 2 — FILTRAR CUPCAKES
app.get('/cupcakes/filtrar', async (req, res) => {
    try {
        const { massa, cobertura, granulado } = req.query;

        let query = `
            SELECT 
                id_produto,
                nome,
                preco,
                massa,
                cobertura,
                granulado,
                quantidade_estoque,
                imagem
            FROM cupcakes
            WHERE 1=1
        `;

        const params = [];

        if (massa) {
            params.push(massa);
            query += ` AND massa = $${params.length}`;
        }
        if (cobertura) {
            params.push(cobertura);
            query += ` AND cobertura = $${params.length}`;
        }
        if (granulado !== undefined && granulado !== '') {
            params.push(granulado === 'true');
            query += ` AND granulado = $${params.length}`;
        }

        query += ` ORDER BY id_produto`;

        const result = await pool.query(query, params);

        res.json({
            sucesso: true,
            cupcakes: result.rows,
            quantidade: result.rows.length
        });

    } catch (err) {
        console.error('ERRO DETALHADO:', err.message);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno no servidor'
        });
    }
});

// 🍰 ROTA 3 — BUSCAR CUPCAKE POR ID
app.get('/cupcakes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            SELECT 
                id_produto,
                nome,
                preco,
                massa,
                cobertura,
                granulado,
                quantidade_estoque,
                imagem
            FROM cupcakes
            WHERE id_produto = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Cupcake não encontrado'
            });
        }

        res.json({
            sucesso: true,
            cupcake: result.rows[0]
        });

    } catch (err) {
        console.error('ERRO DETALHADO:', err.message);
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
    console.log(`Pasta: ${__dirname}`);
});