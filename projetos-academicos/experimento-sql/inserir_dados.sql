-- inserir_dados.sql
USE SistemaUsuarios;

-- Hashes abaixo são fictícios e servem somente para demonstrar o formato.
-- Em uma aplicação real, use Argon2id ou bcrypt no backend.
INSERT INTO Usuarios (nome, email, senha_hash)
VALUES
    ('João Silva', 'joao.silva@example.test', '$argon2id$exemplo$hash-ficticio-01'),
    ('Maria Oliveira', 'maria.oliveira@example.test', '$argon2id$exemplo$hash-ficticio-02'),
    ('Carlos Souza', 'carlos.souza@example.test', '$argon2id$exemplo$hash-ficticio-03');

-- Inserindo dados na tabela de produtos
INSERT INTO Produtos (nome, descricao, preco, quantidade_estoque) 
VALUES
    ('Produto A', 'Descrição do Produto A', 29.99, 100),
    ('Produto B', 'Descrição do Produto B', 19.99, 150),
    ('Produto C', 'Descrição do Produto C', 39.99, 200);
