## 💻 Sobre o Projeto

RocketNotes é uma aplicação para gerenciamento de notas e links úteis. Este é o backend da aplicação, desenvolvido em Node.js, que fornece uma API RESTful para gerenciar usuários, notas, tags e links.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/)
- [Knex.js](http://knexjs.org/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)

## 🔧 Funcionalidades

- [x] Cadastro e autenticação de usuários
- [x] Atualização de dados do usuário
- [x] Upload de avatar
- [x] Criação, listagem e exclusão de notas
- [x] Adição de links às notas
- [x] Adição de tags às notas
- [x] Pesquisa de notas por título, tags ou links

## 🛠 Instalação e Configuração

### Pré-requisitos

- Node.js instalado
- NPM ou Yarn instalado
- Git instalado

### Clonando o repositório

```bash
git clone https://github.com/yourusername/rocketnotes-backend.git

cd rocketnotes-backend
```

### Instalação

1. Instale as dependências do projeto:

```bash
npm install
```

2. Crie um arquivo `.env` baseado no exemplo:

```bash
cp .env.example .env
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```bash
PORT=3001
JWT_TOKEN_SECRET=your_jwt_secret
```

4. Execute as migrations para criar o banco de dados:

```bash
npm run migrate:run
```

### Executando a aplicação

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

### Estrutura do Projeto

```plaintext
src/
  ├── configs/      # Configurações do projeto
  ├── controllers/  # Controladores da aplicação
  ├── database/     # Configurações e migrations do banco de dados
  ├── middlewares/  # Middlewares do Express
  ├── providers/    # Provedores de serviços
  ├── routes/       # Rotas da aplicação
  ├── utils/        # Utilitários
  └── server.js     # Arquivo principal da aplicação
```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run migrate:run`: Executa as migrations do banco de dados

### Endpoints da API

A documentação completa da API pode ser encontrada no arquivo `api.http`. Alguns dos principais endpoints incluem:

- `POST /users`: Criar novo usuário
- `POST /sessions`: Autenticar usuário
- `GET /notes`: Listar notas do usuário
- `POST /notes`: Criar nova nota
- `PATCH /avatar`: Atualizar avatar do usuário
