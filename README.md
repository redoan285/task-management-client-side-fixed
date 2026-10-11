# Task Management API

An Express and TypeScript API using Prisma ORM and MongoDB.

## Requirements

- Node.js 20 or later
- A MongoDB database/Atlas connection string

## Setup

```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to your own MongoDB connection string. Never commit `.env` or share database credentials. Set `PORT` if you do not want the default port `5000`.

## Development and checks

```bash
npm run dev       # start with reload
npm test          # run user validation tests
npm run validate  # validate the Prisma schema
npm run build     # generate Prisma client and compile TypeScript
npm start         # run the compiled server
```

## API

All routes are prefixed with `/api/v1`.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/users/create-user` | Create a user |
| `GET` | `/users` | List users (passwords are never returned) |
| `PATCH` | `/users/:id` | Update an editable user field |
| `DELETE` | `/users/:id` | Delete a user |

Create-user requests require `name`, a valid `email`, and a password of at least 8 characters. Passwords are hashed before storage. Unknown fields and empty update payloads are rejected.

## Project layout

```text
src/
├── app.ts
├── server.ts
├── middleware/
├── modules/user/
├── routes/
└── utils/
prisma/schema.prisma
