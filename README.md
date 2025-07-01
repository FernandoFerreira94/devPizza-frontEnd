# 🍕 DevPizza

Sistema interno completo de gerenciamento de pedidos para pizzarias, com foco em agilidade no atendimento, organização da cozinha e controle gerencial.

---

## 📋 Visão Geral

O **DevPizza** é uma aplicação web fullstack desenvolvida para uso interno em pizzarias. Permite que garçons façam pedidos diretamente da mesa, que a cozinha acompanhe os pedidos confirmados em tempo real e que o gerente finalize o processo com a cobrança.

> ✅ **Totalmente responsivo**, adaptado para uso em **computadores e celulares** (ideal para tablets e smartphones usados por garçons e cozinheiros).

---

## 🔧 Tecnologias Utilizadas

### 💻 Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Icons
- React Toastify (notificações)
- Axios (requisições HTTP)

### 🔙 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Bcrypt.js (criptografia de senhas)
- JSON Web Token (autenticação via token)
- TypeScript

---

## 🧠 Funcionalidades

### 👨‍🍳 Cadastro de Funcionários
- Verificação de e-mail duplicado
- Senhas criptografadas
- Impede cadastros inválidos
- Retorno de token JWT no login
- Middleware de autenticação com token

### 🧾 Gestão de Pedidos
- Garçom registra:
  - Nome do cliente
  - Número da mesa
  - Produtos consumidos
- Os pedidos iniciam como **rascunho** (`draft = true`)
- Somente pedidos **confirmados** (`draft = false`) são enviados para a cozinha

### 🍳 Cozinha
- Visualiza apenas os pedidos confirmados
- Pode marcar o pedido como **finalizado** (`status = true`)

### 💰 Gerente
- Visualiza pedidos finalizados
- Realiza a cobrança com base nos itens pedidos

---

## 🖼 Responsividade

A interface foi construída com **Tailwind CSS** e pensada para:
- ✅ Telas grandes: interface adaptada para desktops (gerente e cozinha)
- ✅ Telas pequenas: uso prático em celulares e tablets (garçons)

---

## 🗂 Estrutura de Código



- `frontend/` → Aplicação Next.js
- `backend/` → API Express com Prisma e PostgreSQL
- `prisma/` → Esquema do banco de dados e migrations

