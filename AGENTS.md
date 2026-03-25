# Correla-Voz Web Agent Instructions

This document provides guidelines for AI agents working on the Correla-Voz web repository.

## Commands

### Build

To build the project, run:

```bash
npm run build
```

This will create a `dist` directory with the production-ready assets.

### Lint

To lint the project, run:

```bash
npm run lint
```

This will check for any linting errors in the TypeScript and TypeScript XML files.

### Test

There are currently no tests in this project. If you add tests, please use Vitest and add a `test` script to `package.json`.

To run a single test file, you would use:

```bash
npm test -- <path/to/test/file>
```

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Code Style

### General

- Follow the existing code style.
- Keep components small and focused on a single responsibility.
- Use functional components and hooks.

### Imports

- Organize imports in the following order:
  1. React and other external libraries
  2. Internal components
  3. Styles and other assets
- Use absolute paths for imports from the `src` directory.

### Formatting

- Use Prettier for code formatting.
- Maximum line length of 80 characters.
- Use single quotes for strings.

### Types

- Use TypeScript for all new code.
- Add types for all function parameters and return values.
- Use interfaces for object shapes.

### Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent`)
- **Files**: kebab-case (e.g., `my-component.tsx`)
- **Variables and functions**: camelCase (e.g., `myVariable`, `myFunction`)
- **CSS classes**: kebab-case (e.g., `my-class`)

### Error Handling

- Use `try...catch` blocks for asynchronous operations that can fail.
- Display user-friendly error messages when something goes wrong.

## Testing

As mentioned above, there are no tests in this project. When adding features or fixing bugs, consider adding tests to ensure the stability of the codebase. Use Vitest as the testing framework and React Testing Library for testing components.

### Test Code Quality

- **Don't assume code is correct**: If tests fail, the implementation code might be wrong
- **Review the code**: When tests fail, analyze the implementation to determine if the bug is in the test or the code
- **Ask before changing implementation**: If you find a bug in the code, ask the user before fixing it

## Workflow

### Task Management

- Only take tasks from the **"Ready"** column in GitHub Projects
- Never take tasks directly from the "Backlog" column

### Implementation Process

1. **Verify**: Confirm the task is in "Ready" column before starting
2. **Move to In Progress**: When starting work, move the task to "In Progress" column
3. **Create branch**: Create branch from `develop` with format `chore/{issue-number}/{short-description}`
4. **Analyze & Plan**: Understand requirements, check relevant skills, consider edge cases
5. **Implement**: Use TDD when possible - write tests first, then code
6. **Test**: Run tests to verify the solution
7. **Build**: Run `npm run build` to ensure nothing is broken
8. **Lint**: Run `npm run lint` to ensure code quality
9. **Commit**: Create meaningful commits describing what and why
10. **Present Changes**: Before creating PR, present all changes and explanation to user for review
11. **Wait for Approval**: Only proceed with PR after user explicitly approves the changes
12. **Push & PR**: Push commits and create PR to `develop`, link the issue
13. **Move to In Review**: When PR is created and checks pass, move the task to "In Review" column

### Task Status Rules

- **Ready** → **In Progress**: Agent moves when starting a task
- **In Progress** → **In Review**: Agent moves when PR is ready (all checks passing)
- **In Review** → **Done**: Only the user can move this (after reviewing and merging)

### Questions

- If any step is unclear, ask the user before proceeding
