## 📌 Descrição

API para gerenciamento de tarefas, desenvolvida em Node.js com TypeScript. Permite autenticação de usuários e manipulação de tarefas, como criação, edição, exclusão e listagem. A API utiliza SQLite como banco de dados e segue uma arquitetura modular e escalável.

---

## ⚙️ Pré-requisitos

1. **Node.js** (versão 16 ou superior) instalado.
2. **NPM** ou **Yarn** para gerenciar pacotes.
3. **SQLite** (não é necessário instalar separadamente; o banco é gerado automaticamente).
4. Variáveis de ambiente configuradas no arquivo `.env`.

---

## 🚀 Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/frosipedro/API-GerenciadorTarefas.git
   cd API
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o arquivo de ambiente**
   
   Renomeie o arquivo `.env.example` para `.env` e configure as variáveis conforme necessário:
   ```env
   PORT=
   JWT_SECRET=
   ```

   Exemplo de JWT SECRET KEY: a8G$9jK1!mZ#4wX2@H7%y

5. **Execute o seed se desejar adicionar dados ao banco (primeiro rode** `npm run dev` **para criar o arquivo data.db)**
   ```bash
   npm run seed
   # ou
   yarn seed
   ```

6. **Inicie o servidor**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

7. **Acesse a API**
   O servidor estará disponível em `http://localhost:4000`.

---

## 📚 Rotas da API

### **Login**
- **POST** `/login`
  - **Corpo da requisição:**
    ```json
    {
      "username": "xxxx",
      "password": "xxxx"
    }
    ```

### **Recuperar as tarefas do usuário**
- **GET** `/tasks`
  - **Header:** Authorization: Bearer `<token>`

### **Criar uma nova tarefa**
- **POST** `/task`
  - **Header:** Authorization: Bearer `<token>`
  - **Corpo da requisição:**
    ```json
    {
      "title": "xxxx",
      "description": "xxxx",
      "date": "DD-MM-YYYY"
    }
    ```

### **Editar uma tarefa existente**
- **PUT** `/task/:taskId`
  - **Header:** Authorization: Bearer `<token>`
  - **Corpo da requisição:**
    ```json
    {
      "title": "xxxx",
      "description": "xxxx",
      "date": "DD-MM-YYYY"
    }
    ```

### **Deletar uma tarefa**
- **DELETE** `/task/:taskId`
  - **Header:** Authorization: Bearer `<token>`

---

## 🗂 Estrutura do projeto

```
API/
├── src/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env.example
├── ormconfig.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **SQLite**
- **Express**
- **Bcrypt**
- **JWT**
- **TypeORM**
- **Dotenv**

---

## 📜 Licença

Este projeto é licenciado sob a licença [MIT](LICENSE). 

---
