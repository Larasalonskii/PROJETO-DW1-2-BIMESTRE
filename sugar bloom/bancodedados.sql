
DROP TABLE IF EXISTS estoque;
DROP TABLE IF EXISTS cupcakes;


CREATE TABLE cupcakes (
    id_produto INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    massa VARCHAR(50) NOT NULL,
    cobertura VARCHAR(100) NOT NULL,
    granulado BOOLEAN NOT NULL,
    imagem VARCHAR(300)
);

INSERT INTO cupcakes
(id_produto, nome, preco, massa, cobertura, granulado, imagem)
VALUES
(1, 'Brigadeiro Clássico', 8.50, 'Chocolate', 'Brigadeiro', TRUE, 'brigadeiro.png'),
(2, 'Morango Vanilla', 7.00, 'Baunilha', 'Morango', FALSE, 'morango.png'),
(3, 'Red Velvet Cream', 9.50, 'Red Velvet', 'Cream Cheese', TRUE, 'redvelvet.png'),
(4, 'Choco Branco', 8.00, 'Chocolate', 'Chocolate Branco', TRUE, 'chocobranco.png'),
(5, 'Baunilha Clássico', 7.50, 'Baunilha', 'Brigadeiro', FALSE, 'baunilha.png'),
(6, 'Cenoura Choco', 9.00, 'Cenoura', 'Chocolate', TRUE, 'Cenoura Ch.png'),
(7, 'Limão Merengado', 8.75, 'Limão', 'Merengue', FALSE, 'Limão Merengado.png'),
(8, 'Nutella Supreme', 8.90, 'Chocolate', 'Nutella', TRUE, 'Nutella Supreme.png'),
(9, 'Oreo Choco', 9.10, 'Chocolate', 'Oreo', TRUE, 'Oreo Choco.png'),
(10, 'Coco Beijinho', 9.20, 'Coco', 'Beijinho', TRUE, 'Coco Beijinho.png');


CREATE TABLE estoque (
    id_produto INTEGER PRIMARY KEY,
    quantidade_estoque INTEGER NOT NULL,

    FOREIGN KEY (id_produto)
        REFERENCES cupcakes(id_produto)
);

INSERT INTO estoque
(id_produto, quantidade_estoque)
VALUES
(1,20),
(2,15),
(3,10),
(4,18),
(5,22),
(6,12),
(7,14),
(8,9),
(9,12),
(10,11);

SELECT
    c.id_produto,
    c.nome,
    c.preco,
    c.massa,
    c.cobertura,
    c.granulado,
    e.quantidade_estoque,
    c.imagem
FROM cupcakes c
JOIN estoque e
ON c.id_produto = e.id_produto;