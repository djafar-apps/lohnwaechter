# Sprint Zero — Evidence Status

Date: 2026-09-19
Branch: sprint-zero/factory-v1

## Verified PASS
- GitHub write access proven.
- Isolated branch and PR workflow proven; main untouched.
- Node 22 / Java 21 CI environment proven.
- package-lock.json committed and valid.
- npm ci PASS.
- Capacitor core/android/cli pinned at 8.5.2.
- npm audit --audit-level=high PASS after replacing vulnerable 8.0.0 CLI line.
- repository secret-pattern scan PASS.
- Android project creation + sync PASS.
- debug APK build PASS.
- APK SHA-256 generated and independently rechecked from downloaded artifact.
- package-lock SHA-256 generated and independently rechecked.
- CycloneDX SBOM generated.
- build metadata generated.
- evidence artifact uploaded and downloaded for verification.

## Evidence
Successful CI run: 35456054631
Evidence artifact: 10587499340
Artifact archive digest: sha256:00d823e7c14198546b53cfcbf151c2098dc7bc5c96539210e450927f3a71560c
APK SHA-256: 5cc676f581246e8a267eaccfd0c2ddc1781de87215b4e342d5d89adab36b0107
Lockfile SHA-256: f139a6351c86c52ae17799be5afa60a93cb19cb6083ee9d9f196852caf29d91d

## Rollback proof
main remains at the historical accepted baseline while all Sprint Zero changes are isolated on sprint-zero/factory-v1 and PR #1. Rollback before merge is branch/PR abandonment with no main mutation. After future releases, immutable artifact hash + commit + migration notes are mandatory.

## Signing / production identity
Debug factory proof is complete. Production signing is intentionally NOT fabricated: production applicationId and release keystore ownership are owner-controlled release decisions. Debug certificate must never be treated as production signing.

## Gate result
SPRINT ZERO FACTORY: PASS for starting Local Core development on the isolated branch.
PRODUCTION RELEASE SIGNING: NOT AUTHORIZED / NOT COMPLETE.
No production release may occur until applicationId and release keystore ownership/backup are explicitly completed.
