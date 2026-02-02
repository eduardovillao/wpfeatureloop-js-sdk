# WPFeatureLoop SDK

[![npm version](https://img.shields.io/npm/v/wpfeatureloop-sdk.svg)](https://www.npmjs.com/package/wpfeatureloop-sdk)
[![license](https://img.shields.io/npm/l/wpfeatureloop-sdk.svg)](https://github.com/eduardovillao/wpfeatureloop-js-sdk/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/wpfeatureloop-sdk)](https://bundlephobia.com/package/wpfeatureloop-sdk)

A feature voting widget SDK for WordPress plugins. Allow your users to view, suggest, vote on, and comment on feature requests in a beautiful roadmap interface.

## Features

- **Feature Voting** - Upvote/downvote features with optimistic UI updates and confetti animations
- **Comments** - Users can discuss and comment on specific features
- **Feature Suggestions** - Authorized users can submit new feature requests
- **Status Tracking** - Display feature lifecycle (Open, Planned, In Progress, Completed)
- **Role-based Access** - Control which user roles can suggest features
- **Multi-language** - Built-in support for English and Portuguese (pt-BR)
- **Zero Dependencies** - Pure vanilla JavaScript, no runtime dependencies
- **Lightweight** - Small bundle size, optimized for performance

## Installation

### NPM

```bash
npm install wpfeatureloop-sdk
```

### Yarn

```bash
yarn add wpfeatureloop-sdk
```

### CDN

```html
<!-- CSS -->
<link
    rel="stylesheet"
    href="https://unpkg.com/wpfeatureloop-sdk/dist/wpfeatureloop.min.css"
/>

<!-- JavaScript -->
<script src="https://unpkg.com/wpfeatureloop-sdk/dist/wpfeatureloop.umd.js"></script>
```

## Quick Start

### HTML

```html
<div id="feature-widget"></div>
```

### JavaScript

```javascript
import WPFeatureLoop from "wpfeatureloop-sdk";
import "wpfeatureloop-sdk/dist/wpfeatureloop.css";

const widget = WPFeatureLoop.init({
    container: "#feature-widget",
    publicKey: "pk_live_your_public_key",
    projectId: "proj_your_project_id",
    user: {
        id: 123,
        name: "John Doe",
        email: "john@example.com",
    },
});
```

### UMD (Browser)

```html
<script>
    const widget = WPFeatureLoop.init({
        container: "#feature-widget",
        publicKey: "pk_live_your_public_key",
        projectId: "proj_your_project_id",
        user: {
            id: 123,
            name: "John Doe",
            email: "john@example.com",
        },
    });
</script>
```

## Configuration

| Option         | Type             | Required | Default             | Description                                 |
| -------------- | ---------------- | -------- | ------------------- | ------------------------------------------- |
| `container`    | `string`         | Yes      | -                   | CSS selector for the container element      |
| `publicKey`    | `string`         | Yes      | -                   | Your WPFeatureLoop public API key           |
| `projectId`    | `string`         | Yes      | -                   | Your project identifier                     |
| `user.id`      | `number\|string` | Yes      | -                   | Current user's unique identifier            |
| `user.name`    | `string`         | No       | -                   | User's display name                         |
| `user.email`   | `string`         | No       | -                   | User's email address                        |
| `user.plan`    | `string`         | No       | -                   | User's subscription plan (free, pro, etc.)  |
| `user.meta`    | `object`         | No       | -                   | Additional user metadata                    |
| `locale`       | `string`         | No       | `'en'`              | Language (`'en'` or `'pt-BR'`)              |
| `userRole`     | `string`         | No       | `'subscriber'`      | Current user's WordPress role               |
| `allowedRoles` | `string[]`       | No       | `['administrator']` | Roles allowed to create features            |
| `signature`    | `string`         | No       | -                   | HMAC signature for secure user verification |
| `apiUrl`       | `string`         | No       | -                   | Custom API URL (for self-hosted)            |

## Full Example

```javascript
const widget = WPFeatureLoop.init({
    container: "#feature-widget",
    publicKey: "pk_live_your_public_key",
    projectId: "proj_your_project_id",
    user: {
        id: 123,
        name: "John Doe",
        email: "john@example.com",
        plan: "pro",
        meta: {
            company: "Acme Inc",
        },
    },
    locale: "en",
    userRole: "administrator",
    allowedRoles: ["administrator", "editor"],
    signature: "hmac_signature_here",
});
```

## API Methods

### `WPFeatureLoop.init(config)`

Static method to create and initialize a widget instance.

```javascript
const widget = WPFeatureLoop.init(config);
```

### `widget.getFeatures()`

Returns a copy of the current features array.

```javascript
const features = widget.getFeatures();
console.log(features);
```

### `widget.refresh()`

Re-fetches features from the API and re-renders the widget.

```javascript
await widget.refresh();
```

### `widget.destroy()`

Removes the widget from the DOM and cleans up.

```javascript
widget.destroy();
```

### `widget.canCreateFeature()`

Returns whether the current user can create new features.

```javascript
if (widget.canCreateFeature()) {
    console.log("User can suggest features");
}
```

## Internationalization

The SDK includes built-in translations for:

- **English** (`en`) - Default
- **Portuguese Brazil** (`pt-BR`)

```javascript
// English (default)
WPFeatureLoop.init({ locale: 'en', ... });

// Portuguese
WPFeatureLoop.init({ locale: 'pt-BR', ... });
```

## CSS Customization

The widget uses CSS custom properties for easy theming. Override these variables to match your brand:

```css
.wfl-container {
    /* Primary colors */
    --wfl-primary: #6366f1;
    --wfl-primary-hover: #4f46e5;
    --wfl-primary-light: #eef2ff;

    /* Status colors */
    --wfl-success: #10b981;
    --wfl-warning: #f59e0b;
    --wfl-danger: #ef4444;

    /* Gray scale */
    --wfl-gray-50: #f9fafb;
    --wfl-gray-100: #f3f4f6;
    --wfl-gray-200: #e5e7eb;
    --wfl-gray-300: #d1d5db;
    --wfl-gray-400: #9ca3af;
    --wfl-gray-500: #6b7280;
    --wfl-gray-600: #4b5563;
    --wfl-gray-700: #374151;
    --wfl-gray-800: #1f2937;
    --wfl-gray-900: #111827;

    /* Typography */
    --wfl-font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

    /* Borders */
    --wfl-radius: 12px;
    --wfl-radius-sm: 8px;

    /* Shadows */
    --wfl-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --wfl-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.15);
}
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Links

- [GitHub Repository](https://github.com/eduardovillao/wpfeatureloop-js-sdk)
- [NPM Package](https://www.npmjs.com/package/wpfeatureloop-sdk)
- [Report Issues](https://github.com/eduardovillao/wpfeatureloop-js-sdk/issues)
