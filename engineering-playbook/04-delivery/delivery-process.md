# Delivery Process

**Status:** Draft

1. Define a ticket, owner, acceptance criteria, and risk.
2. Inspect repository state; protect uncommitted work.
3. Implement on a focused branch.
4. Run relevant tests and security checks; record real results.
5. Open a PR with scope, evidence, risks, and rollback considerations.
6. Obtain review and explicit approval for sensitive operations.
7. Merge only after required checks and review gates are satisfied.
8. Deploy through the product's approved process; validate and monitor the outcome.

Do not invent successful CI, staging, or production results. A failed required check is a blocker until resolved or explicitly dispositioned by an authorized human under the product's policy.
