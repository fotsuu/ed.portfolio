# Memory Bank Protocol & Workflow

You are operating with a persistent **Memory Bank** system designed to preserve project context across sessions, context window resets, and chat turns.

## Memory Bank Structure

The `memory-bank/` directory at the project root is the single source of truth for project knowledge and state:

1. `memory-bank/projectbrief.md`: Foundation document establishing core requirements, project goals, scope, and non-negotiables.
2. `memory-bank/productContext.md`: The "why" and user experience: problems solved, intended audience, workflows, and UX goals.
3. `memory-bank/systemPatterns.md`: System architecture, design patterns, component relationships, key technical decisions, and code conventions.
4. `memory-bank/techContext.md`: Tech stack, development environment, runtime commands, external dependencies, constraints, and toolchains.
5. `memory-bank/activeContext.md`: Dynamic state: current focus, recent changes, active decisions, considerations, and immediate next steps.
6. `memory-bank/progress.md`: Work status: completed features, works-in-progress, backlog/to-do items, and known issues.

---

## The Memory Bank Workflow

### 1. Start of Every Session / Task (Context Verification)
- Before taking any action or writing code, read the Memory Bank files (at minimum `memory-bank/activeContext.md` and `memory-bank/progress.md`).
- If addressing architectural, technical, or foundational questions, consult `systemPatterns.md`, `techContext.md`, or `projectbrief.md`.
- Align your actions with the current status and established patterns.

### 2. During Execution
- Adhere strictly to the design patterns and architecture documented in `systemPatterns.md`.
- Follow the tech conventions and constraints in `techContext.md`.
- If an instruction contradicts established memory bank principles, flag it or propose an update.

### 3. End of Every Task / Milestone (Memory Bank Update)
- **Always update the Memory Bank** before concluding a substantial task or feature implementation:
  - **`activeContext.md`**: Update "Recent Changes", "Current Focus", and "Next Steps".
  - **`progress.md`**: Move items from "To Do" to "Completed", update current status, log any newly discovered issues.
  - **`systemPatterns.md`**: Update if new architecture, patterns, or component relationships were added or refactored.
  - **`techContext.md`**: Update if dependencies, scripts, or runtime configs changed.
- Ensure updates are concise, factual, and maintain documentation integrity.
