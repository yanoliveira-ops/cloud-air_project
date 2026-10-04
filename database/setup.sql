CREATE DATABASE cloud_air;

CREATE TABLE tb_telemetria (
    id BIGSERIAL PRIMARY KEY,
    data_hora TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    temperatura NUMERIC(4,2) NOT NULL,
    umidade NUMERIC(5,2) NOT NULL,
    qualidade_ar_ppm INTEGER NOT NULL,
    quantidade_ocupantes INTEGER NOT NULL DEFAULT 0,
    comando_ir_enviado VARCHAR(30) DEFAULT 'SEM_ACAO'
);                          