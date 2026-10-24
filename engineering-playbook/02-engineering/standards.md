# Engineering Standards

**Status:** Draft

- Define scope, acceptance criteria, and an owner before implementation.
- Inspect existing code and tests before modifying behavior.
- Preserve legacy identifiers and compatibility contracts unless an approved ticket explicitly authorizes migration.
- Accompany code changes with relevant automated tests.
- Fix failing implementation or investigate the cause; do not weaken tests merely to make CI green.
- Never claim tests passed unless they were run and their actual output was inspected.
- Follow the product's localization, accessibility, and domain-specific requirements.
- Keep changes focused; separate unrelated refactors.
- Report residual risks and untested paths.
