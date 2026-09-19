# 🛒 GreenCart (HanaGo) — Smart AI Grocery & E-Commerce App

<div align="center">

<img src="../../assets/icons/greencart_logo.png" alt="GreenCart Logo" width="140"/>

### Production-Grade Flutter E-Commerce Application with AI Shopping Assistant

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.x-0175C2?style=for-the-badge&logo=dart&logoColor=white)](https://dart.dev)
[![GetX](https://img.shields.io/badge/State_Management-GetX-8A2BE2?style=for-the-badge&logo=getx&logoColor=white)](https://pub.dev/packages/get)
[![Screens](https://img.shields.io/badge/Screens-26+-success?style=for-the-badge)](#-ui-showcase--screen-previews)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2F%20Feature--First-blueviolet?style=for-the-badge)](#-technical-architecture)

<br/>

**[📖 Explore Live Documentation & User Guide](https://mmks735.github.io/greencart/)** • **[🏢 Contact AppStick for Commercial License](https://appstick.com.bd)**

</div>

---

> [!IMPORTANT]
> ### 🔒 Intellectual Property & Source Code Notice
> This project and its underlying source code are proprietary commercial software developed at **AppStick Ltd** for commercial distribution / client solutions. To comply with company NDA, privacy policies, and intellectual property agreements, **the complete raw source code is not hosted publicly in this repository**.
> 
> * **Purpose of this repository:** To showcase my professional software engineering contributions, system architecture design, UI/UX implementation, and technical problem-solving.
> * **Need the Code or Commercial License?** Please contact **[AppStick Ltd](https://appstick.com.bd)** directly for enterprise licensing, client solutions, or purchasing the complete source template.

---

## 📌 Executive Summary

**GreenCart (HanaGo)** is an ultra-modern, production-grade Smart Grocery Shopping & E-Commerce Flutter application template. Designed for supermarkets, grocery delivery chains, and organic food retailers, it combines a sleek **glassmorphic design system** with a dedicated **AI shopping assistant** supporting both text and voice interaction.

### 🌟 Key Product Highlights
- 🤖 **Integrated GreenCart AI Assistant:** Text chat & voice query support for instant smart product discovery and direct-to-cart operations.
- 🛍️ **Complete End-to-End E-Commerce Engine:** Catalog browsing, intelligent search with filters, wishlist, cart management, promo coupons, and multi-step checkout.
- 📍 **Real-time Order Tracking:** Interactive milestone stepper for live tracking of grocery deliveries from packaging to doorstep delivery.
- 🎨 **Modern Glassmorphic UI System:** Tailored micro-interactions, responsive typography, custom category icons, and high-performance list rendering.
- 🌐 **Localization & Multi-Language:** Built-in multi-language translation architecture.

---

## 👨‍💻 My Role & Key Engineering Contributions

As a core Mobile Application Developer on this project at **AppStick**, my primary responsibilities encompassed:

### 1. Architecture & State Management (GetX)
- Structured the entire application following **Clean / Feature-First Architecture**, ensuring high modularity, testability, and separation of concerns.
- Implemented **GetX Controllers & Bindings** for reactive state handling across cart calculations, authentication states, product filtering, and dynamic pricing.

### 2. GreenCart AI Assistant Module
- Engineered the dedicated **AI conversational interface** (`hana_ai.dart`, `hana_ai_voice.dart`).
- Built custom visual audio wave animations for voice recognition states.
- Implemented smart product card recommendation widgets embedded directly inside the conversational feed.

### 3. Core E-Commerce Flows
- **Cart & Dynamic Pricing:** Reactive subtotal, tax calculation, delivery fee handling, and instant promo coupon validation.
- **Multi-Step Checkout:** Seamless selection of delivery address, scheduled delivery date/time slot, and payment method selection (Card, Cash on Delivery, Mobile Wallet).
- **Interactive Search & Category Browsing:** Optimized grid and list rendering with debounce filtering for smooth 60fps scrolling.

### 4. Technical Documentation (Docusaurus)
- Spearheaded the technical documentation portal with complete installation, customization guides, API integration points, and component catalogs for developer onboarding.

---

## 📱 UI Showcase & Screen Previews

<div align="center">

### 🌟 Home Experience & Category Browsing
| Welcome & Onboarding | Glassmorphic Home Feed | Category Catalog | Featured Deals & Offers |
| :---: | :---: | :---: | :---: |
| <img src="../../assets/screenshots/greencart/welcome.png" width="180"/> | <img src="../../assets/screenshots/greencart/home.png" width="180"/> | <img src="../../assets/screenshots/greencart/category.png" width="180"/> | <img src="../../assets/screenshots/greencart/home_offers.png" width="180"/> |

### 🤖 GreenCart AI Assistant (Text & Voice)
| AI Home Entry | AI Chat Feed | Voice Interaction State | AI Recommended Product |
| :---: | :---: | :---: | :---: |
| <img src="../../assets/screenshots/greencart/home_ai.png" width="180"/> | <img src="../../assets/screenshots/greencart/hana_ai.png" width="180"/> | <img src="../../assets/screenshots/greencart/hana_ai_voice.png" width="180"/> | <img src="../../assets/screenshots/greencart/ai_product_card.png" width="180"/> |

### 🛒 Shopping, Cart & Checkout Flow
| Product Details | Dynamic Cart | Checkout & Time Slot | Order Confirmed |
| :---: | :---: | :---: | :---: |
| <img src="../../assets/screenshots/greencart/product_details.png" width="180"/> | <img src="../../assets/screenshots/greencart/cart.png" width="180"/> | <img src="../../assets/screenshots/greencart/checkout.png" width="180"/> | <img src="../../assets/screenshots/greencart/order_confirmed.png" width="180"/> |

### 📦 Order Management & Account
| Live Order Tracking | Order History | Saved Addresses | Notification Center |
| :---: | :---: | :---: | :---: |
| <img src="../../assets/screenshots/greencart/track_order.png" width="180"/> | <img src="../../assets/screenshots/greencart/my_orders.png" width="180"/> | <img src="../../assets/screenshots/greencart/delivery_address.png" width="180"/> | <img src="../../assets/screenshots/greencart/notifications.png" width="180"/> |

</div>

---

## 🏗️ Technical Architecture

The project is architected with scalability and maintainability as primary goals:

```
lib/
├── app/
│   ├── data/                 # Models, local mock datasets, repository implementations
│   │   ├── models/           # ProductModel, CategoryModel, OrderModel, CartItemModel
│   │   └── providers/        # Local JSON providers & REST API service clients
│   ├── modules/              # Feature modules (View + Controller + Binding)
│   │   ├── home/             # Home views, category carousels, banner slider
│   │   ├── ai_assistant/     # Text AI chat, voice query UI, audio visualizer
│   │   ├── cart/             # Cart controller, voucher calculations
│   │   ├── checkout/         # Address selection, slot picker, payment options
│   │   ├── order/            # Order tracking stepper, order receipts
│   │   └── product/          # Product details, image gallery, reviews
│   ├── routes/               # GetX AppPages & AppRoutes
│   └── theme/                # Glassmorphic colors, typography, shadow tokens
└── main.dart                 # App initialization, localization bindings
```

### 🧰 Tech Stack & Libraries

| Category | Technology / Package | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Flutter 3.x](https://flutter.dev) | Cross-platform mobile development (Android & iOS) |
| **Language** | [Dart 3.x](https://dart.dev) | Strict null-safe core language |
| **State Management** | `get: ^4.6.6` | Reactive state management, routing & dependency injection |
| **Icons & Vectors** | `flutter_svg: ^2.0.16` | High-definition SVG asset rendering |
| **Date & Currency** | `intl: ^0.20.2` | Internationalization, date formatting & currency parsing |
| **Documentation** | [Docusaurus 3.x](https://docusaurus.io) | Complete developer documentation portal |

---

## 📬 Business & Inquiries

For commercial licensing, enterprise customizations, or full source code access for **GreenCart (HanaGo)**:

* **Company:** AppStick Ltd
* **Website:** [https://appstick.com.bd](https://appstick.com.bd)
* **Engineer Portfolio:** [MD. Mahfujul Karim Sheikh (mmks735)](https://github.com/mmks735)
* **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com)
