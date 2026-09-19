# Validated Research Change Log

## 2026-09-19 — Professional Android/secure-SDLC revalidation
Status: CONFIRMED AND INTEGRATED

### Authoritative sources checked
- Android Developers, Fundamentals of testing Android apps / testing strategies: testing is integral; testable architecture uses decoupled Presentation/Domain/Data layers; local and device/instrumented testing should run during development.
- GitHub Docs, Secure use reference: full-length commit SHA pinning is the immutable-action recommendation.
- GitHub Docs, Artifact attestations: attestations establish build provenance and can bind SBOM information to builds.
- OWASP MASVS/MASTG: mobile security verification baseline covering storage, cryptography, auth, network, platform, code, resilience and privacy.
- NIST SP 800-218 SSDF v1.1 (final): secure practices are integrated into the SDLC. NIST SP 800-218 Rev.1/v1.2 was checked as a 2025 initial public draft and is not treated as replacing the current final baseline.

### Changes accepted
1. Add explicit Stage 5 architecture baseline: UI/Presentation -> Domain -> Data/Repository -> Local Storage.
2. Move device/emulator, performance, accessibility, compatibility and lifecycle/state-restoration verification into Stage 5 as applicable; Stage 6 remains Closed Beta.
3. Formalize NIST SSDF + OWASP MASVS/MASTG mapping in security gates.
4. Require full commit-SHA pinning for Actions before production release.
5. Add artifact provenance/attestation to production supply-chain hardening where supported.
6. Formalize permanent research intake: validate -> compare/conflict check -> status -> canonical-file update -> retain evidence.

### Conflict check against prior plan
No fundamental conflict with the six-stage sequence. Recovery -> Gate0 -> Execution Plan -> Sprint Zero -> Local Core -> Closed Beta remains authoritative.
Refinement: earlier wording could imply real-device testing mainly in Stage 6; that interpretation is superseded. Stage 5 now includes engineering device/emulator testing, while Stage 6 is user Closed Beta.
Refinement: Sprint Zero factory remains PASS for development, while production supply-chain hardening/signing remains a release gate.
