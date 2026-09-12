# Lohnwächter Android Cloud Build

This package turns the current Lohnwächter v0.2 web prototype into an installable Android APK using Capacitor + GitHub Actions.

## What this solves
No Android SDK is needed on the phone or local computer. GitHub's hosted runner performs the Android build.

## Build path
1. Create a GitHub repository.
2. Upload all files from this package to the repository.
3. Open the Actions tab.
4. Run `Build Android APK`.
5. When the run finishes, download artifact `Lohnwaechter-APK`.
6. Extract `app-debug.apk`.
7. Rename it to `Lohnwaechter-v0.2-test.apk` if desired.
8. Send that APK in WhatsApp as a document.
9. Android testers may need to allow `Install unknown apps` for WhatsApp/My Files/Chrome.

## Important
This is a test APK, not a Google Play production release. It contains the local v0.2 prototype and no paid cloud AI.
