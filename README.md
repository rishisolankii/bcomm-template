# Angular E-commerce Template
Last Updated at: Sep 19, 2025

A customizable Angular template for building e-commerce applications with pre-built components and theming support.

## Overview

This template provides a complete set of Angular components for e-commerce applications. Developers can customize the HTML and CSS to create their own unique designs while maintaining the underlying functionality.

## Getting Started

### Prerequisites

- Node.js (v18.19.1 or higher)
- npm (v8.0.0 or higher)
- Angular CLI

### Installation

1. Clone or download the template
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the development server:

```bash
npm run start
# or
ng serve
```

Navigate to `http://localhost:4201/` to view the application.

## Developer Preview Options

There are **two ways** to preview and develop templates:

### 1. With Mock Data Inside Template (Available Now)

Preview components with realistic mock data for better development experience:

- Navigate to `http://localhost:4201/` to see the full template preview
- All components automatically display with sample data when no real data is provided
- Interactive preview with navigation between different page types

📖 **[View Complete Mock Data Documentation](./MOCK_DATA_README.md)**

### 2. Production Website Integration (Work in Progress - Coming Soon!)

Preview your template on the actual production website:

> **🚧 This feature is currently under development and will be released soon.**
>
> If you want to test this now, you can use ngrok or similar tools:
>
> 1. Expose your local development server using ngrok
> 2. Add `/remoteEntry.js` to your external URL
> 3. Use that URL as a query parameter on the production website: `?dev_preview=YOUR_NGROK_URL/remoteEntry.js`

## Component Preview

You can also preview individual components by accessing their routes:

- Header: `http://localhost:4201/header`
- Footer: `http://localhost:4201/footer`
- Cart: `http://localhost:4201/cart`
- Product List: `http://localhost:4201/products`
- [Add other component routes as needed]

## Customization Guidelines

### ✅ What You CAN Customize

#### HTML Templates

- Modify any `.html` file in the components
- Add new HTML elements and structure
- Change layout and component organization
- Add custom CSS classes

#### Styles

- Update component-specific `.scss` files
- Modify global styles in `src/styles.scss`
- Customize theme variables in `src/assets/styles/variables.scss`
- Add new color themes following existing patterns

#### Theme Customization

The template includes multiple pre-built themes:

- `THEME_FASHION` - Fashion/clothing stores
- `THEME_FURNITURE` - Furniture stores
- `THEME_ELECTRONIC` - Electronics stores
- `THEME_GARDEN` - Garden/outdoor stores
- `THEME_BEAUTY` - Beauty/cosmetics stores

To create a new theme, follow the pattern in `src/styles.scss`.

### ❌ What You SHOULD NOT Change

#### TypeScript Files

- **Do not modify** any `.ts` files
- Keep all existing event handlers and method calls
- Maintain all `@Input()` and `@Output()` properties
- Preserve component lifecycle methods

#### Webpack Configuration

- **Do not change** `webpack.config.js`
- This file contains critical build configurations

#### Events and Data Binding

When customizing HTML, ensure you:

- Keep all existing `(click)`, `(change)`, `(submit)` event handlers
- Maintain `[(ngModel)]` and `[property]` bindings
- Preserve `*ngFor`, `*ngIf`, and other structural directives

### Example: Safe HTML Customization

```html
<!-- ✅ GOOD: Adding custom styling while keeping events -->
<button class="my-custom-button btn-primary" (click)="addToCart(product)" [disabled]="isLoading">
  <i class="fas fa-shopping-cart"></i>
  Add to Cart
</button>

<!-- ❌ BAD: Removing or changing event handlers -->
<button class="my-custom-button">Add to Cart</button>
```

## Mock Data for Development

This template now includes comprehensive mock data to improve the developer experience. Instead of seeing empty components, developers can preview the template with realistic data.

📖 **[Complete Mock Data Guide](./MOCK_DATA_README.md)** - Detailed documentation on how mock data works and how to customize it.

### Quick Start with Mock Data

All components automatically use mock data when real data isn't provided:

```html
<!-- Component will automatically show mock data if no real data is passed -->
<app-product-detail></app-product-detail>

<!-- Real data takes priority when provided -->
<app-product-detail [product]="realProductData"></app-product-detail>
```

## Theme Switching

To apply different themes, add the theme class to the `<body>` element:

```html
<body class="THEME_FASHION">
  <!-- or -->
  <body class="THEME_ELECTRONIC"></body>
</body>
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Component Structure

```
src/
├── app/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── product-list/
│   │   ├── cart/
│   │   └── ...
│   └── ...
├── assets/
│   └── styles/
│       └── variables.scss
└── styles.scss
```

## Preview Feature

✅ **Mock Data Preview (Available Now)**: Full template preview with realistic mock data
🚧 **Production Integration (Coming Soon)**: Preview templates directly on production websites

### Current Features

- Interactive component preview with sample data
- Multiple page type previews (Home, Product, Category, Cart, Contact)
- Full layout preview with all template components
- Easy template customization with instant visual feedback

### Upcoming Features

- Direct integration with production websites
- Real-time template switching on live sites
- Advanced preview customization options

## Best Practices

1. **Test Frequently**: Use `npm run start` to preview changes
2. **Backup Original**: Keep a copy of original files before customizing
3. **Follow Existing Patterns**: Maintain the same HTML structure patterns
4. **Use Existing Classes**: Leverage existing CSS classes for consistency
5. **Validate Events**: Ensure all user interactions still work after customization

## Support

If you encounter issues:

1. Check that all event handlers are preserved
2. Verify TypeScript files haven't been modified
3. Ensure `webpack.config.js` remains unchanged
4. Test component routes individually

## File Structure Guidelines

- **Modify**: `.html`, `.scss`, `variables.scss`
- **Don't Touch**: `.ts`, `webpack.config.js`
- **Be Careful**: Maintain all Angular directives and event bindings

---

**Remember**: The goal is to customize the appearance and layout while preserving all functionality. When in doubt, keep the existing structure and only modify styling and content.
