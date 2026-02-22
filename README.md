# Clean Architecture in Next.js

## A Todo Project That’s Actually Architected Properly

![Clean Architecture for Frontends](/public/clean-architecture-for-frontends.png)

This repository demonstrates how to implement **Clean Architecture in a Next.js application** using a properly structured Todo project.

Most frontend projects mix UI, API calls, and business logic in the same place.  
This project shows how to structure a frontend application using:

- Clear separation of concerns
- Dependency rule enforcement
- Use-case driven architecture
- Swappable infrastructure
- Testable business logic

---

# Why This Project Exists

Frontend applications grow messy fast.

This project demonstrates how to structure a Next.js app the same way we structure serious backend systems:

- Domain-driven
- Use-case oriented
- Framework-agnostic at the core
- Replaceable infrastructure

The goal is to prove that **frontend architecture matters just as much as backend architecture**.

---

# Architecture Overview

The project follows Clean Architecture principles with strict dependency direction.

## Dependency Rule

Outer layers depend on inner layers — never the other way around.

```
Presentation → Application → Domain
Infrastructure → Application → Domain
```

### Layers Explained

### 1. Domain

- Entities
- Business rules
- Repository contracts (interfaces)
- No framework dependencies
- No Next.js dependencies
- No React dependencies

This is the core of the application.

---

### 2️. Application

- Use cases
- Orchestrates business logic
- Depends only on Domain
- No direct API calls
- No UI logic

Example use cases:

- CreateTodo
- GetTodos
- UpdateTodo
- DeleteTodo

---

### 3️. Infrastructure

- Implements repository interfaces
- Handles HTTP calls (JSON Server)
- Can be swapped without touching Domain or Application

Example:

- TodoRepositoryJsonServer

---

### 4️. Presentation

- Next.js components
- React hooks
- UI state management
- Calls use cases from the Application layer

If React Query is used, it calls `/app/api`, and `/app/api` depends on the Application layer — not the other way around.

---

# 📂 Project Structure

```
src/
│
├── domain/
│   ├── entities/
│   └── repositories/
│
├── application/
│   └── use-cases/
│
├── infrastructure/
│   └── repositories/
│
├── presentation/
│   ├── components/
│   └── hooks/
│
└── app/                # Next.js App Router
```

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- pnpm
- JSON Server (mock backend)
- React Query (optional integration)

---

# Getting Started

## 1️. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 2️. Install Dependencies (Using pnpm)

```bash
pnpm install
```

If you don’t have pnpm installed:

```bash
npm install -g pnpm
```

---

## 3️. Run JSON Server (Mock Backend)

This project uses JSON Server as a fake backend API.

If json-server is already configured in package.json:

```bash
pnpm json-server
```

Otherwise:

```bash
pnpm add -D json-server
npx json-server --watch db.json --port 4000
```

JSON Server will run on:

```
http://localhost:4000
```

---

## 4️. Run the Next.js App

In another terminal:

```bash
pnpm dev
```

App runs on:

```
http://localhost:3000
```

---

# Production Build

```bash
pnpm build
pnpm start
```

---

# Example Flow (End-to-End)

1. User clicks "Add Todo"
2. Presentation layer calls `CreateTodo` use case
3. Use case depends on `TodoRepository` interface
4. Infrastructure provides concrete implementation
5. JSON Server handles persistence
6. Response flows back up to the UI

Each layer stays isolated and testable.

---

# What Makes This Different?

Most frontend apps:

- Put API calls inside components
- Mix business logic with UI
- Have no real architectural boundaries

This project:

- Enforces separation of concerns
- Keeps business logic framework-agnostic
- Makes infrastructure replaceable
- Makes the core testable

---

# Possible Improvements

- Add unit tests for use cases
- Add integration tests
- Swap JSON Server with real backend
- Add authentication
- Add environment-based infrastructure switching
- Add dependency injection container

---

# License

MIT License

---

# Author

Built to demonstrate practical Clean Architecture in frontend applications.
Because scalable frontend systems require proper architecture — not just components.
