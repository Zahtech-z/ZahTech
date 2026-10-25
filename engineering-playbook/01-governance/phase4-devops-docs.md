# Phase 4 — DevOps and Documentation Roles

**Status:** Draft for owner review.

- [DevOps Coach](../../.claude/agents/zahtech-devops-coach.md) advises on CI/CD, infrastructure, backups, monitoring and rollback. Owner-controlled execution remains mandatory.
- [Documentation Engineer](../../.claude/agents/zahtech-documentation-engineer.md) maintains ADRs, runbooks, architecture documentation and evidence-backed handoffs.

Both agent definitions are read-only by default and do not create autonomous background workers. Runtime tool permissions and owner approval still govern actual actions.

## Collaboration example

1. Project Manager selects a ticket and confirms acceptance criteria.
2. Software Architect reviews design tradeoffs when needed.
3. DevOps Coach prepares an operator checklist for any infrastructure change.
4. Anicet approves and performs owner-controlled operations.
5. QA and Security review relevant results.
6. Documentation Engineer updates the proposed ADR/runbook with verified evidence.
7. Project Manager records final status only when completion criteria are verified.

Product-specific instructions override these generic examples when more restrictive.
