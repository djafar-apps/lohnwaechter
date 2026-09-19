# Gate B — Security, Privacy & Acceptance Evidence

Status: IMPLEMENTED — CI/INDEPENDENT REVIEW PENDING
Date: 2026-09-19

## Scope
Work Profile + Contract Facts only. Local-first. No AI, cloud document processing, analytics, account backend or network dependency is introduced.

## Data and provenance
Stored locally: profile name, employer, employment type, weekly hours, annual leave days, optional gross hourly rate, record id, update timestamp, and provenance. User-entered facts are marked internally as `user_confirmed` and displayed as **Vom Nutzer bestätigt**.

No contract facts have hidden numeric defaults. Invalid or unsupported stored data is not silently replaced. Unknown schema versions and malformed JSON return a blocking typed error and preserve the original raw storage value.

## MASVS-oriented mapping
- MASVS-STORAGE: Gate B data stays in application local storage; no transmission path exists in this slice. Production backup policy and Android backup hardening remain release-gate work.
- MASVS-PRIVACY: only fields required by this slice are collected; no tracker, analytics, advertising, AI, or network call is present.
- Secret control: repository CI secret scan remains mandatory.
- Dependency control: high/critical dependency advisory gate remains fail-closed. npm's Bulk Advisory service is currently returning HTTP 503 maintenance; this blocks CI rather than being bypassed.

## Automated evidence
`tests/local-core.test.js` checks validation, persistence/reload, provenance, malformed JSON, unsupported schema preservation, UI required fields, accessibility live regions, absence of hidden 28/30/40 defaults, and absence of fetch/XMLHttpRequest/WebSocket in the Gate B UI.

## Manual / independent evidence still required before PASS
- Browser/Android interaction: create, invalid submit, edit, reload/restart, focus/error behavior.
- Independent Reviewer approval. Builder cannot self-approve.
- Full CI green after external npm advisory service is available.

## Gate decision
Gate B is **not PASS** until the pending evidence above is satisfied. This document does not waive any project gate.
