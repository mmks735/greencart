---
sidebar_position: 7
---

# Troubleshooting & Maintenance

This section covers common compilation errors, SDK conflicts, and build optimization scripts. Use these steps to resolve issues when compiling or building the **GreenCart** mobile application.

---

## 1. Standard Cleanup Commands

If you face unexpected compiler errors after updating package dependencies or pulling codebase updates, the local build caches may be out of sync. Use the cleanup process below to reset the build environment:

1.  Clean the build caches:
    ```bash
    flutter clean
    ```
2.  Refresh package dependencies:
    ```bash
    flutter pub get
    ```
3.  *(For iOS development only)* Re-install native iOS pods:
    ```bash
    cd ios
    pod deintegrate
    pod cache clean --all
    pod install --repo-update
    cd ..
    ```

---

## 2. Common Android Build Errors

### Missing SDK Licenses
*   **Symptom**: "Android SDK file not found" or "Licenses not accepted" during `flutter build apk`.
*   **Fix**: Accept Android SDK licenses via command-line:
    ```bash
    flutter doctor --android-licenses
    ```
    Type `y` (yes) to accept all agreements.

### Multidex Limit Reached
*   **Symptom**: `The number of method references in a .dex file cannot exceed 64K.`
*   **Fix**: Android Multidex is already configured in GreenCart, but if you customize settings or add heavy packages, open `android/app/build.gradle` and ensure:
    ```groovy
    android {
        defaultConfig {
            multiDexEnabled true
        }
    }
    ```

---

## 3. Common iOS Compilation Issues

### CocoaPods Mismatch on M1/M2/M3 Apple Silicon Macs
*   **Symptom**: Build fails during the `pod install` step with architecture mismatch warnings.
*   **Fix**: Force the CocoaPods engine to run using x86 translation compatibility mode:
    ```bash
    sudo arch -x86_64 gem install cocoapods
    arch -x86_64 pod install --repo-update
    ```

### CocoaPods Out of Date
*   **Symptom**: Dependency compilation fails due to outdated pod specs.
*   **Fix**: Run a pod specs update inside the iOS folder:
    ```bash
    cd ios
    pod repo update
    pod install
    cd ..
    ```

### Signing and Profile Configuration
*   **Symptom**: `Signing for "Runner" requires a development team.`
*   **Fix**: 
    1. Open `ios/Runner.xcworkspace` in Xcode.
    2. Select the **Runner** project, choose the **Signing & Capabilities** tab.
    3. Under **Signing**, choose your registered **Development Team** in the dropdown.
    4. Ensure **Automatically manage signing** is checked.

---

## 4. Release Optimization Guide

When compiling the final production bundles for Google Play Store and Apple App Store, use the commands below to compile with full compilation optimizations:

### Build Android App Bundle (AAB):
```bash
flutter build appbundle --release
```
*The resulting `.aab` file will be located at `build/app/outputs/bundle/release/app-release.aab`.*

### Build iOS Archive (IPA):
```bash
flutter build ipa --release
```
*Upload the compiled archive to App Store Connect using Xcode Transporter or directly from Xcode Organizer.*
