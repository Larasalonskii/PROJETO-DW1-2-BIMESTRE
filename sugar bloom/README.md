# 🧁 Sugar Bloom

Site de cupcakes artesanais com catálogo, filtros, carrinho e controle de estoque.

---

## Tecnologias

**Frontend**
- HTML, CSS e JavaScript
- Google Fonts (Playfair Display e Nunito)
- CSS Grid e Flexbox

**Backend**
- Node.js + Express
- `pg` para conectar com o PostgreSQL
- `dotenv` para as variáveis de ambiente

**Banco de dados**
- PostgreSQL com duas tabelas: `cupcakes` e `estoque`

---

## Estrutura

```
sugar-bloom/
├── imagens/
│   ├── brigadeiro.png
│   ├── morango.png
│   ├── redvelvet.png
│   ├── chocobranco.png
│   ├── baunilha.png
│   ├── cenoura.png
│   ├── limao.png
│   ├── nutella.png
│   ├── oreo.png
│   └── coco.png
├── index.html          * catálogo principal
├── detalhes.html       * detalhes do cupcake
├── tabela.html         * tabela de estoque
├── style.css           * estilos
├── server.js           * servidor/api
├── bancodedados.sql    * banco de dados
├── fundov2.png         * imagem do header
├── .env
├── package.json
└── package-lock.json
```

---

## Banco de dados

**`cupcakes`**
| Coluna | Tipo | Descrição |
|---|---|---|
| id_produto | INTEGER (PK) | Identificador único |
| nome | VARCHAR(100) | Nome do cupcake |
| preco | NUMERIC(10,2) | Preço |
| massa | VARCHAR(50) | Tipo de massa |
| cobertura | VARCHAR(100) | Tipo de cobertura |
| granulado | BOOLEAN | Tem granulado ou não |
| imagem | VARCHAR(300) | Nome do arquivo de imagem |

**`estoque`**
| Coluna | Tipo | Descrição |
|---|---|---|
| id_produto | INTEGER (PK/FK) | Referência ao cupcake |
| quantidade_estoque | INTEGER | Quantidade disponível |

---

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/cupcakes` | lista todos os cupcakes |
| GET | `/cupcakes/filtrar` | filtra por massa, cobertura e/ou granulado |
| GET | `/cupcakes/:id` | busca um cupcake pelo id |
| GET | `/fotos/:arquivo` | serve as imagens |
| GET | `/confirmar` | verifica se a api tá rodando |

Exemplos:
```
GET /cupcakes/filtrar?massa=Chocolate
GET /cupcakes/filtrar?cobertura=Brigadeiro&granulado=true
GET /cupcakes/3
```

---

## Como rodar

**Pré-requisitos:** Node.js, PostgreSQL e npm instalados.

```bash
# 1. clone o repositório
git clone <url-do-repositorio>
cd sugar-bloom

# 2. instale as dependências
npm install

# 3. execute o banco de dados
psql -U seu_usuario -d nome_do_banco -f bancodedados.sql
```

Crie um arquivo `.env` na raiz:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
PORT=3001
```

```bash
# 4. inicie o servidor
node server.js
```

Abra o `index.html` no navegador.

---

## Funcionalidades

- catálogo com foto, nome, massa, cobertura e preço
- filtros por nome, massa, cobertura e granulado
- carrinho com controle de quantidade e valor total
- página de detalhes com barra de estoque visual
- tabela de estoque completa

---

## Autora

Lara Salonski Zanoni