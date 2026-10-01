USE fechafacil;

CREATE TABLE caixa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE fechamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    data_hora_abertura DATETIME NOT NULL,

    valor_abertura DECIMAL(10,2) NOT NULL
        CHECK (valor_abertura >= 0),

    data_hora_fechamento DATETIME NULL,

    valor_esperado DECIMAL(10,2) NULL
        CHECK (valor_esperado IS NULL OR valor_esperado >= 0),

    valor_contado DECIMAL(10,2) NULL
        CHECK (valor_contado IS NULL OR valor_contado >= 0),

    diferenca DECIMAL(10,2) NULL,

    caixa_id BIGINT NOT NULL,

    CONSTRAINT fk_fechamento_caixa
        FOREIGN KEY (caixa_id)
        REFERENCES caixa(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
);

CREATE TABLE movimentacao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    tipo VARCHAR(20) NOT NULL
        CHECK (tipo IN ('ENTRADA', 'SAIDA', 'SANGRIA', 'REFORCO')),

    valor DECIMAL(10,2) NOT NULL
        CHECK (valor > 0),

    descricao VARCHAR(150) NULL,

    data_hora DATETIME NOT NULL,

    fechamento_id BIGINT NOT NULL,

    CONSTRAINT fk_movimentacao_fechamento
        FOREIGN KEY (fechamento_id)
        REFERENCES fechamento(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
);