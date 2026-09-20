# Project Instructions & Memory Bank Protocol

This repository uses a **Memory Bank** system located in the `memory-bank/` directory to maintain persistent project context across AI developer sessions.

## Memory Bank Architecture

The following six files in `memory-bank/` define the project state:
- `memory-bank/projectbrief.md`: Foundation document, scope, core requirements, and objectives.
- `memory-bank/productContext.md`: Product rationale, target audience, UX principles, and case study contexts.
- `memory-bank/systemPatterns.md`: System design, modular structure, CSS token architecture, script patterns, and conventions.
- `memory-bank/techContext.md`: Tech stack (vanilla HTML/CSS/JS, zero build toolchain), local dev setup, browser compatibility.
- `memory-bank/activeContext.md`: Active focus, recent changes, decisions made, and upcoming roadmap items.
- `memory-bank/progress.md`: Feature completion checklist, validation status, and known issues.

## Required Agent Workflow

1. **Initialize / Read Context**: At the beginning of any task or session, review `memory-bank/activeContext.md` and `memory-bank/progress.md` before writing code or making plans.
2. **Execute According to Patterns**: Follow the system patterns and technical constraints defined in `memory-bank/systemPatterns.md` and `memory-bank/techContext.md`.
3. **Synchronize Memory Bank**: After completing tasks, adding features, or making architectural decisions, update `memory-bank/activeContext.md` and `memory-bank/progress.md` (and other memory bank files as appropriate) to keep the repository's persistent memory current.
