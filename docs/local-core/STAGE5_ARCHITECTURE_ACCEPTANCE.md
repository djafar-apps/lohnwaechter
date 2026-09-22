# Stage 5 — Local Core Architecture & Acceptance Baseline

Status: IMPLEMENTATION START
Date: 2026-09-19

## Architecture
UI/Presentation -> Domain/Business Rules -> Data/Repository -> Local Storage.
UI never owns payroll/calendar business rules. Domain calculations are deterministic and independently testable. Repository interfaces isolate persistence. Local-first is the default; network/AI is optional and outside core correctness.

## First implementation slice — Work Profile + Contract Facts
Required fields are explicit user facts, not hidden defaults. No hardcoded annual leave, weekly hours, job type or employment assumptions.
Each saved fact carries provenance/status: Vom Nutzer bestätigt where user-confirmed. Schema changes require migration and restore evidence.

## Acceptance evidence
- Unit tests for validation/domain rules.
- Repository/persistence tests including restart/reload.
- Migration/backup rollback test before schema replacement.
- UI/instrumented happy path and invalid-input path.
- Accessibility labels/focus for interactive fields.
- Locale test: Persian UI must not change the underlying Gregorian calendar policy.
- Security/privacy mapping for stored fields under MASVS-STORAGE and MASVS-PRIVACY.
- No network dependency for core operation.

## Stop rule
Gate B cannot PASS from a working screen alone. Code + tests + security/privacy evidence + regression evidence are required.
