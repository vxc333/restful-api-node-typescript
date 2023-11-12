# CRUD de Clientes usando TypeScript, Prisma e Express

Este projeto consiste em um CRUD (Create, Read, Update, Delete) para o cadastro de clientes. Utiliza TypeScript para garantir tipagem estática, Prisma como ORM para interagir com o banco de dados, e Express como framework web.

## Requisitos

- Node.js (v14.0.0 ou superior)
- npm ou yarn
- Banco de dados PostgreSQL

## Configuração

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Instale as dependências:

    ```bash
    cd resful-api-node-typescript
    npm install @prisma/client@^5.5.2 @types/express@^4.17.21 express@^4.18.2 --save
    
    npm install @types/node@^20.9.0 prisma@^5.5.2 ts-node-dev@^2.0.0 typescript@^5.2.2 --save-dev
    ```

    ou

    ```bash
    yarn add @prisma/client@^5.5.2 @types/express@^4.17.21 express@^4.18.2
    
    yarn add @types/node@^20.9.0 prisma@^5.5.2 ts-node-dev@^2.0.0 typescript@^5.2.2 --dev
    ```

3. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```
    DATABASE_URL=postgresql://usuario:senha@endereco-do-banco:5432/nome-do-banco
    ```

## Uso

1. Inicie o servidor:

    ```bash
    npm run dev # ou yarn dev
    ```

2. Acesse a API em [http://localhost:3333](http://localhost:3000/)

## Rotas

- **GET /clientes**: Retorna a lista de todos os clientes.
- **GET /clientes/:id**: Retorna os detalhes de um cliente específico.
- **POST /clientes**: Cadastra um novo cliente. Envie um corpo JSON com "nome" e "email".
- **PUT /clientes/:id**: Atualiza os dados de um cliente específico. Envie um corpo JSON com os campos a serem atualizados.
- **DELETE /clientes/:id**: Exclui um cliente específico.

## Estrutura do Banco de Dados

O banco de dados contém uma tabela `clientes` com os seguintes campos:

- `id` (chave primária)
- `nome` (nome do cliente)
- `email` (e-mail único do cliente)

Certifique-se de que seu banco de dados PostgreSQL esteja configurado corretamente.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou relatar problemas.

---

Este README fornece uma visão geral básica do projeto. Consulte o código-fonte para obter detalhes específicos da implementação.
