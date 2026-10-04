const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Health Check (Teste simples de vida do servidor)
app.get('/', (req, res) => {
  res.json({ status: 'API Cloud-Air Online' });
});

// 1. ROTA POST: O ESP32 dispara as leituras para cá
app.post('/api/telemetria', async (req, res) => {
  try {
    const { 
      temperatura, 
      umidade, 
      qualidade_ar_ppm, 
      quantidade_ocupantes, 
      comando_ir_enviado 
    } = req.body;

    // Validação de presença de campos obrigatórios
    if (temperatura === undefined || umidade === undefined || qualidade_ar_ppm === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes no JSON.' });
    }

    const query = `
      INSERT INTO tb_telemetria 
        (temperatura, umidade, qualidade_ar_ppm, quantidade_ocupantes, comando_ir_enviado)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      temperatura,
      umidade,
      qualidade_ar_ppm,
      quantidade_ocupantes ?? 0,
      comando_ir_enviado ?? 'SEM_ACAO'
    ];

    const result = await pool.query(query, values);

    console.log(' Telemetria gravada com sucesso:', result.rows[0]);

    return res.status(201).json({
      success: true,
      message: 'Registro gravado no PostgreSQL',
      data: result.rows[0]
    });

  } catch (error) {
    console.error(' Erro ao gravar telemetria:', error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// 2. ROTA GET: Consulta as últimas 10 leituras gravadas
app.get('/api/telemetria', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_telemetria ORDER BY data_hora DESC LIMIT 10;');
    return res.json(result.rows);
  } catch (error) {
    console.error(' Erro na consulta:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar histórico de telemetria.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Cloud-Air rodando em http://localhost:${PORT}`);
});