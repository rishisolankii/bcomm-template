# Template Development with Mock Data

## Overview

This Angular template now includes comprehensive mock data to improve the developer experience. Instead of seeing empty components, developers can preview the template with realistic data that demonstrates how each component works in a real application.

## Key Features

### 🎯 Mock Data Service

- Centralized mock data service (`MockDataService`) provides realistic test data
- Products, categories, banners, cart items, user profiles, and more
- Consistent data structure that matches real API responses

### 🔧 Component Enhancement

All components now include:

- **Input-first approach**: Real data from parent components takes priority
- **Fallback mock data**: Automatic mock data when Input properties are empty
- **Default values**: Sensible defaults for all component properties

### 🖥️ Developer Preview

- New `/dev-preview` route shows complete template functionality
- Interactive navigation between different page types (Home, Product, Category, Cart, Contact)
- Full layout with header, navigation, content, and footer
- Demonstrates all components working together

## Components with Mock Data

### Layout Components

- **Header**: Store logo, cart count, user info
- **Header Top Strip**: Promotion messages, CMS links
- **Header Categories**: Category navigation with product counts
- **Footer**: Company info, categories, CMS links
- **Footer Copyright**: Company name and copyright

### Content Components

- **Home**: Banners, product recommendations, categories
- **Product Detail**: Full product info, variants, reviews, related products
- **Categories**: Product listings, filters, sorting, subcategories
- **Cart**: Shopping cart items, totals, recommendations
- **Item Card**: Product display with pricing and ratings

### Form Components

- **Login/Register**: Form validation and default form groups
- **Contact**: Contact form with company information
- **Forgot Password**: Email reset form

### Other Components

- **Breadcrumb**: Navigation breadcrumbs
- **Banner Items**: Promotional banners with CTAs
- **Hero Components**: Various hero section layouts
- **Account Components**: User profile and sidebar navigation

## Usage

### Development Mode

1. Start the development server: `npm start`
2. Navigate to `http://localhost:4200` to see the full preview
3. Use the navigation buttons to switch between different page types

### Component Testing

Each component can be used independently:

```typescript
// With real data (preferred)
<app-product-detail [product]="realProductData"></app-product-detail>

// Without data (will use mock data automatically)
<app-product-detail></app-product-detail>
```

### Customizing Mock Data

Edit `src/app/services/mock-data.service.ts` to:

- Add more products or categories
- Change default prices or descriptions
- Update company information
- Modify banner content

## File Structure

```
src/app/
├── services/
│   └── mock-data.service.ts          # Centralized mock data
├── dev-preview/
│   ├── dev-preview.component.ts      # Development preview page
│   └── dev-preview.component.scss    # Preview page styles
└── [component-folders]/
    └── *.component.ts                # Enhanced with mock data
```

## Benefits for Developers

1. **Visual Development**: See how components look with real data
2. **Component Testing**: Test individual components without backend setup
3. **Design Validation**: Validate layouts with various content lengths
4. **Client Demos**: Show clients how the template will look with their data
5. **Template Documentation**: Self-documenting components with examples

## Best Practices

### Input Properties First

Always check for Input data before using mock data:

```typescript
ngOnInit() {
  if (!this.products || this.products.length === 0) {
    this.products = this.mockDataService.getMockProducts();
  }
}
```

### Type Safety

Define interfaces for your data structures:

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  // ... other properties
}
```

### Environment-Specific Mocking

Use environment flags to control mock data usage:

```typescript
if (environment.useMockData && !this.realData) {
  this.data = this.mockDataService.getMockData();
}
```

## Production Considerations

- Mock data is only used when real Input data is not provided
- No performance impact on production builds
- Easy to remove mock data service if not needed
- Compatible with existing component architecture

This enhancement makes the template development process much more intuitive and provides a better preview experience for both developers and clients.
