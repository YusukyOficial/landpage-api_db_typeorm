# 📦 Landpage API - DB TypeORM  

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)  
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com/)  
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3.x-red?logo=typeorm)](https://typeorm.io/)  
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql)](https://www.mysql.com/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)  

API RESTful para gerenciamento de uma **landing page**, construída com **Node.js**, **Express**, **TypeORM**, **MySQL** e **TypeScript**.  
Seu objetivo é fornecer endpoints organizados para manipular conteúdo dinâmico, facilitando a integração com o frontend.  

---

## 🚀 Tecnologias Utilizadas  

- ⚡ [Node.js](https://nodejs.org/) – Ambiente de execução  
- 🌐 [Express](https://expressjs.com/) – Framework para APIs  
- 🗄️ [TypeORM](https://typeorm.io/) – ORM para bancos relacionais  
- 🔵 [TypeScript](https://www.typescriptlang.org/) – Tipagem estática  
- 🐬 [MySQL](https://www.mysql.com/) – Banco de dados relacional  
- 🔐 [dotenv](https://github.com/motdotla/dotenv) – Variáveis de ambiente  

---

## 📁 Estrutura do Projeto  

```bash
landpage-api_db_typeorm/
│-- src/
│   ├── entities/        # Entidades (models do banco)
│   ├── migrations/      # Histórico de alterações do banco
│   ├── routes/          # Definição das rotas
│   ├── controllers/     # Lógica das requisições
│   ├── services/        # Regras de negócio
│   ├── database/        # Configuração do TypeORM
│   └── index.ts         # Ponto de entrada da aplicação
│
├── .env.example         # Variáveis de ambiente
├── ormconfig.json       # Configuração do TypeORM
├── package.json
└── tsconfig.json
```

---

## ⚙️ Instalação  

Clone o repositório e instale as dependências:  

```bash
git clone https://github.com/YusukyOficial/landpage-api_db_typeorm.git
cd landpage-api_db_typeorm
npm install
```

---

## 🔑 Configuração  

Crie um arquivo `.env` baseado no `.env.example`:  

```env
PORT=3000
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=landpage_db
```

---

## 🗄️ Migrations  

```bash
# Criar uma migration
npm run typeorm migration:create ./src/migrations/NomeMigration

# Rodar todas as migrations
npm run typeorm migration:run

# Reverter a última migration
npm run typeorm migration:revert
```

---

## ▶️ Executando o Projeto  

```bash
npm run dev
```

A API estará disponível em:  
👉 `http://localhost:3000`  

---

## 📌 Exemplo de Entidade (LandingPage)  

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("landing_pages")
export class LandingPage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;
}
```

---

## 📌 Endpoints (Exemplo)  

| Método | Rota            | Descrição                   |
|--------|----------------|-----------------------------|
| GET    | /api/pages     | Lista todas as landing pages |
| GET    | /api/pages/:id | Retorna uma landing page     |
| POST   | /api/pages     | Cria uma nova landing page   |
| PUT    | /api/pages/:id | Atualiza uma landing page    |
| DELETE | /api/pages/:id | Remove uma landing page      |

---

## 🤝 Contribuição  

Contribuições são sempre bem-vindas!  
Faça um **fork**, crie uma **branch** e abra um **Pull Request** 🚀  

---

## 📄 Licença  

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar e modificar conforme necessário.  

---

## 👨‍💻 Desenvolvido por

Desenvolvido com 💚 por [YusukyOficial](https://github.com/YusukyOficial)

