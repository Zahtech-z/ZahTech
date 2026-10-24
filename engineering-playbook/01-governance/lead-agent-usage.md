# Lead Agent Usage — Phase 2

**Status:** Draft for review.

## Claude-compatible agent definitions

- [ZahTech Project Manager](../../../.claude/agents/zahtech-project-manager.md)
- [ZahTech Software Architect](../../../.claude/agents/zahtech-software-architect.md)

These files provide agent instructions in the existing `.claude/agents/` convention. They do **not** create autonomous background workers, guarantee execution, or grant new tool permissions. Actual tool access depends on the agent runtime and user approvals.

## Suggested workflow

1. Project Manager reads the product's approved priorities and selects a ticket.
2. Software Architect reviews significant design decisions and proposes options/ADR.
3. Owner approves the decision and any sensitive action.
4. Appropriate implementation agents execute the approved ticket.
5. QA/security verify relevant acceptance criteria with recorded evidence.
6. Project Manager reports verified progress and blockers.

## OnzScore-specific boundary

OnzScore launch order, the nine release gates, bilingual content rules, and owner-operated infrastructure remain defined in OnzScore documentation, not in this company-wide guide.

## Future work

After review, consider templates for ADRs, assignment briefs, architecture review checklists, and explicit integration guidance for other ZahTech repositories.
