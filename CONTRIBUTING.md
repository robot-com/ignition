# Contributing to \[Your Project Name\]

Welcome! This document outlines the development guidelines and conventions for \[Your Project Name\]. These rules ensure consistency, maintainability, and collaboration across the team and AI agents.

## Development Setup

1. **Environment**: Use `.env` file on the root 
2. **Package Manager**: Use `pnpm` for all package management
3. **Node Version**: Use Node.js v22.x (LTS)

## Code Style & Formatting

- **Formatter**: Use Biome for all code formatting
- **Indentation**: 4 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Use only when necessary (Biome default)
- **Imports**: Organize imports automatically with Biome
- **Linting**: Follow Biome's recommended rules with custom overrides

Run formatting before commits:
```bash
pnpm format
```

## Project Structure & Organization

### Monorepo Layout

Follow the established structure:
- `apps/`: Application entry points (web, server, landing, app, etc.)
- `packages/`: Business logic features (self-contained modules)
- `shared/`: Cross-cutting concerns (api, database, auth, components, etc.)
- `docs/`: Documentation

### Package Organization

**Shared Packages** (`shared/*`):
- `api/`: tRPC router composition
- `api-helpers/`: Base tRPC procedures and middleware
- `database/`: Database schema and connection
- `auth/`: Authentication logic
- `context/`: Dependency injection context
- `components/`: Shared React components
- `lib/`: Utility functions

**Feature Packages** (`packages/*`):
- Each feature is a self-contained package
- Export tRPC routers, services, and types
- Use `shared/api-helpers` for base procedures
- Keep business logic encapsulated

### File Structure Convention

```
packages/my-feature/
├── src/
│   ├── index.ts          # Main exports
│   ├── router.ts         # tRPC procedures
│   ├── services.ts       # Business logic
│   └── types.ts          # Type definitions
├── package.json
└── tsconfig.json
```

## tRPC Conventions

### Procedure Naming

Use consistent naming for CRUD operations:

```typescript
export const myFeature = router({
    // CREATE
    create: protectedProcedure
        .input(createSchema)
        .mutation(async ({ ctx, input }) => { ... }),

    // READ (single)
    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => { ... }),

    // READ (list)
    list: protectedProcedure
        .input(listSchema.optional())
        .query(async ({ ctx, input }) => { ... }),

    // UPDATE
    update: protectedProcedure
        .input(updateSchema)
        .mutation(async ({ ctx, input }) => { ... }),

    // DELETE
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => { ... }),

    // Custom operations
    customAction: protectedProcedure
        .input(customSchema)
        .mutation(async ({ ctx, input }) => { ... }),
})
```

### Input/Output Schemas

- Define Zod schemas for all inputs and outputs
- Use descriptive field names
- Include validation messages
- Keep schemas in separate files when complex

```typescript
// Good
const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
})

// Avoid
const createPostSchema = z.object({
    t: z.string(),
    c: z.string(),
})
```

### Router Organization

- One router per feature package
- Group related procedures logically
- Export router as default from package
- Use descriptive procedure names

### Error Handling

- Use tRPC's built-in error handling
- Throw `TRPCError` with appropriate codes
- Provide meaningful error messages

## Database & Schema

### Schema Definition

- Define schemas in `shared/database/src/schema/`
- Use Drizzle ORM conventions
- Follow naming conventions: `snake_case` for columns, `camelCase` for relations
- Include proper constraints and defaults

```typescript
export const posts = pgTable('posts', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(),
    content: text('content').notNull(),
    authorId: text('author_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})
```

### Migrations

- Use Drizzle's migration system
- Run migrations via: `pnpm db:push`
- Never modify existing migrations manually

## Testing

- Write tests for all business logic
- Use the established testing framework (check existing packages)
- Place tests in `src/tests/` directories
- Follow naming: `*.test.ts` or `*.spec.ts`

## Git & Commit Messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

**Examples**:
```
feat(posts): add create post endpoint
fix(auth): resolve session validation bug
docs(api): update tRPC procedure documentation
```

### Branch Naming

```
feature/description-of-feature
bugfix/description-of-bug
hotfix/critical-fix
```

Or if you use other naming conventions, please ensure they are documented.

## Pull Requests

- Create descriptive PR titles
- Include screenshots for UI changes
- Reference related issues
- Ensure CI passes
- Request review from relevant team members

## AI Agent Guidelines

### Code Generation Rules

1. **Follow tRPC Naming**: Always use the specified CRUD procedure names
2. **Maintain Structure**: Keep packages modular and follow the file structure convention
3. **Use Biome Formatting**: Generate code that passes Biome checks
4. **Include Types**: Always add proper TypeScript types and Zod schemas
5. **Avoid Globals**: Never use global variables or singletons
6. **Dependency Injection**: Pass dependencies through context, not globals

### When Adding Features

1. Create new package in `packages/` if it's a distinct business feature
2. Add tRPC router with proper naming conventions
3. Update database schema in `shared/database/`
4. Add router to `shared/api/src/server/root.ts`
5. Export from package's `index.ts`
6. Update TypeScript references in root `tsconfig.json`

### Code Review Checklist for AI

- [ ] Follows tRPC naming conventions
- [ ] Proper error handling with TRPCError
- [ ] Input/output schemas defined with Zod
- [ ] No circular dependencies
- [ ] Proper dependency injection via context
- [ ] Database operations use schema definitions
- [ ] Code passes Biome formatting
- [ ] Tests included for business logic
- [ ] Proper TypeScript types throughout

## Getting Help

- Check existing code for patterns
- Review the README.md for architecture overview
- Ask in team chat for clarification
- Reference this document for any conflicts

Remember: Consistency is key. When in doubt, follow the patterns established in existing code.