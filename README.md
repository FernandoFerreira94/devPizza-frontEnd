# 🍕 DevPizza

Sistema interno de gerenciamento de pedidos para pizzarias, focado em otimizar o fluxo entre garçons, cozinha e gerência.

## 📋 Visão Geral

O **DevPizza** é uma aplicação web completa desenvolvida para uso interno em pizzarias, onde garçons registram pedidos diretamente da mesa, a cozinha acompanha em tempo real apenas os pedidos confirmados, e o gerente finaliza o processo com a cobrança.

---

## 🔧 Tecnologias Utilizadas

### 💻 Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Icons
- React Toastify (notificações)
- **Axios** (requisições HTTP para o backend)

### 🔙 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL

---

## 🧠 Funcionalidades

### 🧾 Pedidos
- Garçom pode registrar o nome do cliente, número da mesa e itens do pedido.
- Os pedidos iniciam como `rascunho` (`draft = true`), e **não são visíveis para a cozinha** até serem finalizados pelo garçom.
- Ao confirmar, o `draft` é alterado para `false` e a cozinha pode visualizar e iniciar o preparo.

### 🍳 Cozinha
- Acompanha somente os pedidos confirmados.
- Pode alterar o status do pedido para `finalizado` (`status = true`), indicando que está pronto para entrega.

### 💰 Gerente
- Acompanha pedidos finalizados e realiza a cobrança com base nos itens consumidos.

### 👨‍🍳 Usuários do Sistema
- Cadastro de funcionários (garçom, cozinha, gerente).
- Verificação de e-mail duplicado e senha segura (criptografada com `bcrypt`).
- Impede cadastros inválidos e garante controle de acesso.

---

## 🗂 Estrutura de Código

- `frontend/` → Aplicação Next.js
- `backend/` → API Express com Prisma e PostgreSQL
- `prisma/` → Esquema do banco de dados e migrations

