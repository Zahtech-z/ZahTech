# ZahTech Agent Delivery Workflow v0.1

**Status:** Proposed — human-reviewed orchestration protocol, not autonomous execution.

## Preconditions

- A human owner has approved a specific product, goal and scope.
- The coordinator reads this playbook and the product repository's instructions.
- The coordinator identifies the actual tools and permissions available. Agent definitions do not create independent processes or tool access.
- Product-specific restrictions override this generic workflow.

## Workflow

| Gate | Responsible role | Deliverable | Exit condition |
| --- | --- | --- | --- |
| Intake | Project Manager | Task brief, priority, owner, scope, acceptance criteria | Human confirms scope when ambiguous |
| Design | Software Architect | Options, decision proposal, risks, ADR if needed | Decision approved when consequential |
| Implementation | Backend / Frontend | Focused change, tests, PR | Change and evidence submitted |
| Verification | QA / Security | Reproducible test/security findings | Required criteria VERIFIED; otherwise blocked |
| Operations | DevOps Coach | Operator checklist, rollback and observability plan | Human separately authorizes sensitive execution |
| Documentation | Documentation Engineer | Updated docs, ADR/runbook references | Claims supported by evidence |
| Closure | Project Manager | Status, PRs, blockers, owner actions | Only VERIFIED criteria marked complete |

Not every ticket requires every role. Skip irrelevant stages explicitly, with rationale.

## Handoff contract

Each agent receives:
1. Ticket ID and product/repository/branch.
2. Goal, in-scope and out-of-scope work.
3. Acceptance criteria and constraints.
4. Known evidence with VERIFIED, REPORTED or UNKNOWN labels.
5. Expected artifact, review owner and approval gates.

Each agent returns:
1. Status: proposed / in progress / blocked / review / verified done.
2. Files/PRs, exact commands and observed results.
3. Evidence labels and remaining unknowns.
4. Risks, blockers, next owner decision and suggested next agent.

Use the [task report](../06-templates/task-report.md). A reported green CI status is not VERIFIED until independently inspected.

## Safety and approvals

Before sensitive actions (database writes, dependencies, deletion, schema changes, production, billing or external accounts), stop and request:

- **Action:** exact intended operation.
- **Scope:** impacted systems, files or data.
- **Risk:** potential failure or irreversible impact.
- **Expected result:** verifiable outcome.

Approval is action-specific. Do not infer blanket consent from approval of a plan or a PR.

## Git workflow

- Inspect repository state before modifications; preserve unrelated work.
- Use a dedicated branch and a focused PR for approved work.
- Never merge automatically without explicit human authorization.
- Never bypass failing checks or claim an unrun test passed.
- Record rollback instructions for risky changes.

## OnzScore adoption note

OnzScore has its own agent governance, release sequence, bilingual requirements and owner-controlled DevOps. Review its actual repository instructions before assigning work. Do not assume this document changes OnzScore or launches agents.
