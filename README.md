# WPFeatureLoop SDK

[![npm version](https://img.shields.io/npm/v/wpfeatureloop-sdk.svg)](https://www.npmjs.com/package/wpfeatureloop-sdk)
[![license](https://img.shields.io/npm/l/wpfeatureloop-sdk.svg)](https://github.com/eduardovillao/wpfeatureloop-js-sdk/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/wpfeatureloop-sdk)](https://bundlephobia.com/package/wpfeatureloop-sdk)

A feature voting widget SDK for WordPress plugins. Allow your users to view, suggest, vote on, and comment on feature requests in a beautiful roadmap interface.

## Features

- **Feature Voting** - Upvote/downvote features with optimistic UI updates and confetti animations
- **Comments** - Users can discuss and comment on specific features
- **Feature Suggestions** - Users can submit new feature requests
- **Status Tracking** - Display feature lifecycle (Open, Planned, In Progress, Completed)
- **Multi-language** - Built-in support for English and Portuguese (pt-BR)
- **Zero Dependencies** - Pure vanilla JavaScript, no runtime dependencies
- **Lightweight** - Small bundle size, optimized for performance
- **Single Import** - CSS is automatically injected, no separate stylesheet needed

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
<script src="https://unpkg.com/wpfeatureloop-sdk"></script>
```

> **Note:** CSS is automatically injected when the SDK loads. No separate stylesheet import needed.

## Quick Start

### HTML

```html
<div id="feature-widget"></div>
```

### JavaScript

```javascript
import WPFeatureLoop from "wpfeatureloop-sdk";

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

Returns `true`. Access control should be handled server-side (e.g., WordPress `current_user_can()`).

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
    --wfl-primary: #3b82f6;
    --wfl-primary-hover: #2563eb;
    --wfl-primary-light: #eff6ff;

    /* Status colors */
    --wfl-success: #10b981;
    --wfl-warning: #f59e0b;
    --wfl-danger: #ef4444;

    /* Gray scale (Slate) */
    --wfl-gray-50: #f8fafc;
    --wfl-gray-100: #f1f5f9;
    --wfl-gray-200: #e2e8f0;
    --wfl-gray-300: #cbd5e1;
    --wfl-gray-400: #94a3b8;
    --wfl-gray-500: #64748b;
    --wfl-gray-600: #475569;
    --wfl-gray-700: #334155;
    --wfl-gray-800: #1e293b;
    --wfl-gray-900: #0f172a;

    /* Typography */
    --wfl-font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

    /* Borders */
    --wfl-radius: 10px;
    --wfl-radius-lg: 14px;

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
