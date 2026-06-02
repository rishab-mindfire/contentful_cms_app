# Contributing Guide

Thank you for your interest in contributing! This project uses a **Next js (frontend)**. Please follow the guidelines below to ensure smooth collaboration.

---

## Project Setup

# 1. Clone the Repository

```bash
git clone https://github.com/rishab-mindfire/contentful_cms_app
```

---

# 2. Install Dependencies

#### Backend (strapi)

```bash
cd contentful_cms_app
npm install
npm run dev
```

---

# 3. Environment Variables

Create a `.env` file for frontend example

```
# Dabtabse URL
DATABASE_URL="postgresql://myuser:password@localhost:5432/mydatabase?schema=public"

# Auth
BETTER_AUTH_SECRET="##############"
BETTER_AUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="##########"
GITHUB_CLIENT_SECRET="#############"
GOOGLE_CLIENT_ID="######.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="#############"

# Strapi backend API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

> note : Never commit `.env` files to version control.

---

# 4. Coding Standards

### General Rules

- Use **TypeScript** for all new code
- Keep functions small and reusable
- Avoid unnecessary comments — write clean, readable code instead

### Naming Conventions

- Variables & functions → `camelCase`
- Constants → `UPPER_CASE`
- Folder name → `lowelcase`

---

### Linting & Formatting

- Use **ESLint** and **Prettier**
- Run before committing:

```
npm run lint
npm run format
```

husky used for pre commites error check before commiting to origin

---

## Git Workflow

### Branch Naming

- `feature/your-feature-name`
- `bugfix/issue-name`
- `hotfix/urgent-fix`

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: v18.x or higher (required for stable `worker_threads` support).
- **Docker**: for db setup or use local version.
- **Package Manager**: npm or yarn.

### Commit Messages

Use clear and meaningful messages:

```
feat: add login API
fix: resolve file upload issue
refactor: clean project controller logic
```

---

## Pull Request (PR) Guidelines

Before submitting a PR:

- Ensure code compiles without errors
- Run tests (if available)
- Follow coding standards
- No unnecessary console logs

---

### PR Checklist

Include the following in your PR:

- Description of changes
- Related issue (if any)
- Screenshots (for UI changes)
- Steps to test

---

### Example PR Title

```
feat: added API for pricing endpoint
```

---

## Reporting Issues

When creating an issue, include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## Important Notes

- Do **not** push directly to `main` branch
- Always create a Pull Request
- Keep PRs small and focused

---

## Final Advice

If something feels unclear, don’t guess — ask.
Good contributions are not just about code, but also clarity and consistency.
