# Lohnwächter — Execution Master Plan (Stage 3)

Status: EXECUTION BASELINE
Date: 2026-09-19

## Purpose
Turn the recovered product decisions into an auditable zero-to-Closed-Beta delivery path. Historical GitHub v0.2 is build evidence only. Hatchable v45-v52 is the strongest calendar behavior reference. Floot is architecture/UI reference only where compatible. New engineering lineage is Git-based Android.

## Non-negotiable product contract
Contract facts + Dienstplan + Actual Work + Payslip facts + Employer Reply -> deterministic numeric reconciliation + evidence history -> expert handoff.

Core works with AI off. Local-first. No raw sensitive documents/AU/medical data to cloud AI by default. AI never creates payroll facts or arithmetic and does not give legal advice.

## Delivery gates
### Gate A — Sprint Zero factory
Owner: Builder; approval: Reviewer + QA + Security.
Dependencies: GitHub write, lockfile, deterministic CI.
Acceptance evidence: fresh checkout; npm ci; Android build; APK SHA256; build metadata; dependency audit; secret scan; SBOM; rollback record. Supply-chain hardening before production release also requires GitHub Actions pinned to verified full-length commit SHAs and build provenance/artifact attestation where supported.
Stop rule: no feature work if factory is red.

### Stage 5 architecture baseline (validated 2026-09-19)
Before Gate B feature implementation, use a testable separation of concerns: UI/Presentation -> Domain/Business Rules -> Data/Repository -> Local Storage. Business rules and payroll/calendar calculations must not live in UI code. This follows Android official guidance on testable layered architecture.

For every Stage 5 implementation unit, evidence must cover as applicable: unit/local tests, integration tests, instrumented/UI tests, regression tests, security/privacy checks, performance/compatibility checks, accessibility checks, and lifecycle/state-restoration behavior. Device/emulator verification begins during Stage 5; Stage 6 remains real-user Closed Beta, not the first device test.

Security verification baseline: NIST SSDF practices integrated through the SDLC plus OWASP MASVS/MASTG controls appropriate to the feature, including STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, RESILIENCE and PRIVACY. Threat/risk assumptions and exceptions must be recorded rather than silently accepted.

Research governance: material findings from external research are not adopted directly. They must be checked against authoritative/current sources, compared with existing project decisions for conflict, assigned confirmed/conflicting/superseded/open status, and only then written into the relevant canonical project file with source/date/rationale. Original evidence is retained.

### Gate B — Work Profiles + Contract Facts
Acceptance: no unexplained hardcoded leave/hours/job assumptions; user-confirmed facts are labeled; migration tested; local persistence tested.
Rollback: schema migration reversible or backup/restore proven.

### Gate C — Calendar / Dienstplan
Acceptance: CAL-045/046/047/048/049/052 regression suite. UI language must not change calendar system; Persian UI remains Gregorian unless user explicitly chooses otherwise. Heute uses real local date. Selection never recenters unexpectedly. Rhythm is source of truth; date exceptions remain local; Ist remains independent.

### Gate D — Actual Work
Acceptance: planned vs actual are distinct; edits are date-scoped; past records are not silently rewritten; timezone/local-date tests pass.

### Gate E — Payslip Facts + Reconciliation
Acceptance: user-confirmed payslip facts; deterministic calculations; traceable formula inputs; labels: Vom Nutzer bestätigt / Berechnet / Mögliche Abweichung. No legal conclusion.

### Gate F — Evidence History + Export/Backup
Acceptance: immutable event history where required; export readable; backup and restore tested on clean install; integrity check; retention behavior documented.

### Gate G — Limited AI
Acceptance: explicit opt-in; minimized/redacted payload; preview before send/use; quotas and hard cost stop; AI-off core remains complete. AI may explain deterministic trace or draft neutral discrepancy text only.

### Gate H — Closed Beta
Sequence: owner device -> 5 -> 10 -> 20-50 testers only after prior cohort passes.
Measure: crash/bug rate, calendar regressions, reconciliation correctness, backup/restore, performance, privacy/security, AI spend.
No production expansion while a critical gate is red.

## Engineering loop
Every implementation unit: Design -> Builder -> unit/integration testing -> Reviewer -> QA/UI-regression testing -> Security/Privacy verification -> Release acceptance.
Builder cannot self-approve. Evidence is attached to the change. Red checks block merge.

## Version/control policy
main = accepted release history.
staging = accepted integration.
feature/* = isolated work.
sprint-zero/* = factory work.
No direct feature push to main. Every release records version, commit SHA, artifact SHA, signing fingerprint, migration notes and rollback target.

## Owner-only decisions/actions
Production applicationId must be explicitly approved before first production-signed release.
Release keystore/password are created and backed up by owner on a trusted machine; never pasted into chat or committed.
Any paid service requires owner approval first.

## Cost guardrail
Prefer EUR 0. No paid service is activated without explicit owner approval. AI warning target EUR 10; hard stop target EUR 20 for the approved test budget unless owner changes it.

## Stage ordering
1 Recovery — PASS.
2 Gate 0 / lineage — controlled rebuild decision accepted.
3 This Execution Master Plan — establishes order/dependencies/acceptance/evidence/rollback.
4 Sprint Zero factory — must PASS before features.
5 Local Core — Gates B through G.
6 Closed Beta — Gate H.

## Current blockers after this document
Sprint Zero remains incomplete until the CI run proves the factory. Production applicationId and release signing are intentionally deferred until needed for production signing; debug factory proof may use historical test identity.


## Recovered product decisions — mandatory build contract (revalidated 2026-09-19)
These are binding recovered decisions and must be checked before UI/product implementation.

### Languages
- Exactly five initial UI languages: German, Persian, Arabic, Ukrainian, English.
- German is the default language.
- Turkish was explicitly removed and replaced by Ukrainian.
- Language selection is independent from country/jurisdiction/rule pack.

### Shift systems and personalization
- Dienstplan must support 1-shift, 2-shift, 3-shift and 4-shift systems.
- Users can create/customize their own recurring shift rhythm.
- The approved rhythm is projected onto the calendar from its explicit start date.
- Past dates remain independently editable and must not silently shift the future rhythm.
- Actual/Ist remains independent from planned Dienstplan.

### Dienstplan photo / OCR
- User can photograph/scan a Dienstplan.
- OCR/extraction reads dates/shifts and proposes calendar entries.
- Recognition is never silently committed: user confirmation is required before applying extracted shifts.
- Raw sensitive content stays local by default; cloud/AI use follows the separate explicit opt-in/minimization rules.

### Calendar and holidays
- Official public holidays are shown in the calendar.
- Holidays are markers only and never alter the shift-cycle rhythm.
- Persian UI must remain Gregorian unless the user explicitly selects another calendar policy.
- Heute uses the real local date.
- Daily/date rail supports past and future horizontal navigation.
- Horizontal date movement must be smooth/direct-manipulation behavior; selecting a day must not recenter or reload the rail unexpectedly.

### Preservation rule
Controlled rebuild preserves approved product behavior and UX knowledge. A technically clean replacement is not acceptable if it silently drops recovered/approved capabilities. Before implementation, relevant recovered decisions must be converted into acceptance/regression criteria.
