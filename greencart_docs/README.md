# GreenCart

A premium Flutter grocery e-commerce app template with 32 screens, built-in AI assistant, and 9 language support.

## What's Included

- 32 fully designed screens (onboarding, home, cart, checkout, orders, settings)
- AI shopping assistant with voice input and recipe suggestions
- 9 languages: English, German, Spanish, French, Italian, Indonesian and more
- Dark-green design system with Manrope typography
- GetX state management
- Firebase push notifications (optional)
- Liquid glass UI effect (iOS 26-style, via `liquid_glass_renderer`)
- Mock product data ready to replace with your own

## Quick Start

```bash
# Install dependencies
flutter pub get

# Run the app
flutter run
```

## Customization

| What to Change | File |
|----------------|------|
| App name | `android/app/src/main/AndroidManifest.xml` |
| Brand colors | `lib/constants/ui.dart` |
| Logo | `assets/icons/logo.png` |
| Languages | `assets/translations/` |
| Product data | `assets/data/products.json` |

## Documentation

Open the `hana_go/` folder and run:

```bash
npm install
npm start
```

This opens the full documentation site in your browser.

## Requirements

- Flutter SDK 3.12 or higher
- Android Studio or VS Code
- Android emulator or physical device
