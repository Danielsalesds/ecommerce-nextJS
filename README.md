# 🛒 E-commerce Next.js + Prisma + PostgreSQL

Aplicação web simples de e-commerce construída com **Next.js (App Router)**, **Prisma ORM**, **PostgreSQL** e **Docker Compose**.

O projeto contém frontend e backend integrados, permitindo gerenciar produtos, adicionar/remover itens em um carrinho e visualizar o resumo do carrinho em tempo real.

---

## 🚀 Tecnologias Utilizadas

* **Next.js 14+** (App Router)
* **React**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **Docker & Docker Compose**
* **Node.js**

---

## 📦 Funcionalidades

### 🖥️ **Frontend**

* Listagem de produtos
* Página de detalhes do carrinho
* Botões de adicionar/remover itens
* Cálculo automático de subtotal e total

### 🛠️ **Backend (API Routes - Next.js)**

Endpoints implementados:

| Método | Rota            | Descrição                 |
| ------ | --------------- | ------------------------- |
| GET    | `/api/products` | Lista todos os produtos   |
| GET    | `/api/cart`     | Consulta o carrinho atual |
| POST   | `/api/cart`     | Adiciona item ao carrinho |
| DELETE | `/api/cart/:id` | Remove item do carrinho   |

### 🗄️ **Banco de Dados**

Tabelas usadas:

* `products (id, name, price, image_url)`
* `cart (id, subtotal, total)`
* `cart_items (id, cart_id, product_id, quantity)`

---

## 🧰 **Como Rodar o Projeto Localmente**

### ✔ 1. Clone o repositório

```bash
git clone https://github.com/Danielsalesds/ecommerce-nextJS.git
cd ecommerce-nextJS
```

---

## ✔ 2. Configure variáveis de ambiente

Crie o arquivo:

```
.env
```

Exemplo básico:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce"
```

---

## ✔ 3. Subir o PostgreSQL com Docker

```bash
docker compose up -d
```

Isso iniciará o banco configurado no `docker-compose.yml`.

---

## ✔ 4. Instalar dependências

```bash
npm install
```

---

## ✔ 5. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

Você também pode visualizar o banco:

```bash
npx prisma studio
```

---

## ✔ 6. Rodar a aplicação

```bash
npm run dev
```

Abra no navegador:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 **Estrutura de Pastas**

```
.
├── app/
│   ├── api/
│   │   ├── cart/
│   │   └── products/
│   ├── cart/
│   └── page.tsx
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── package.json
├── README.md
```

---

## 📤 Deploy

Você pode fazer deploy em:

* **Vercel** (frontend + backend juntos)
* **Render** (banco PostgreSQL)


Guia oficial:
[https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📝 Git & Commits

O projeto segue boas práticas de versionamento:

Exemplos de commits semânticos:

```
feat: adicionar endpoint de criação de produto
fix: corrigir cálculo do subtotal
style: melhorar layout da página do carrinho
refactor: reorganizar serviços da API
```

---

## 📚 Aprendizados & Objetivo

Este projeto demonstra:

* Integração completa **Next.js + Prisma**
* Utilização de **Docker** para ambiente isolado
* APIs internas utilizando **Next.js App Router**
* Operações CRUD reais com banco PostgreSQL
* Criação de um mini e-commerce funcional

---

## 📄 Licença

Este projeto é de estudo e livre para uso pessoal.

---
