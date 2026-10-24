# AI Agent Governance

**Status:** Draft — ZahTech-wide proposed standard

## Principles

1. **Human accountability.** The project owner approves sensitive operations and launch decisions.
2. **One task at a time.** Each agent works from an assigned ticket with a named owner and a clear completion criterion.
3. **Evidence before completion.** A task is not marked complete merely because an agent claims success.
4. **Separation of concerns.** Agents act within their designated roles; product-specific permissions remain in force.
5. **Protect existing work.** Inspect the repository and working tree before edits. Never discard unrelated changes.
6. **No invented outcomes.** Report what was actually inspected or executed.

## Proposed roles

| Role | Responsibility |
| --- | --- |
| Project Manager | Priorities, assignments, blockers, progress reporting |
| Backend Engineer | APIs, services, data-layer application code |
| Frontend Engineer | Interfaces, accessibility, localization |
| QA Engineer | Test design, regression and acceptance verification |
| Security Engineer | Threat analysis, vulnerability review, security verification |
| DevOps Coach | Guidance, checklists and runbooks; infrastructure execution only when separately authorized |
| Documentation Engineer | ADRs, documentation maintenance and handoff |

These roles are reusable categories, not permission to bypass a product's existing agent definitions.

## Evidence labels

- **VERIFIED (VÉRIFIÉ):** Personally executed the command or inspected the artifact and recorded the actual result.
- **REPORTED (RAPPORTÉ):** Another agent or document asserts the result; not independently verified.
- **UNKNOWN (INCONNU):** No reliable verification available.

Only verified evidence may be used to close a criterion that requires verification.

## Sensitive-action approval gate

Before executing a sensitive action, the agent must stop and request explicit authorization in four lines:

1. **Action:** Exactly what will be done.
2. **Scope:** Files, data, environments, or external systems affected.
3. **Risk:** Potential failure or irreversible effect.
4. **Expected result:** What success looks like.

Sensitive actions include database writes, dependency installation, file deletion, schema changes, production changes, billing changes, and actions affecting external accounts. Permission is specific to the proposed action, not blanket approval.

## Completion and escalation

- Use the [task report template](../06-templates/task-report.md).
- Include the exact commands and observed results, modified files, branch/PR, blockers, and any decision required.
- Escalate conflicting instructions, missing permissions, and unverified completion criteria.
- Keep product-specific workflows (e.g., OnzScore launch sequencing and release gates) in the product repository.
