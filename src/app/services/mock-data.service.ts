import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getMockProducts(count: number = 8) {
    const products = [
      {
        id: 'product-1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
        image: 'assets/images/products/headphones.jpg',
        productSummary: { 
          price: { price: 199.99, oldPrice: 249.99 },
          hasDiscount: true,
          discountPercent: 20
        },
        avgRatings: 4.5,
        totalReviews: 128,
        category: 'electronics',
        inStock: true
      },
      {
        id: 'product-2',
        name: 'Smart Fitness Watch',
        description: 'Advanced smartwatch with health monitoring, GPS tracking, and long battery life. Track your fitness goals.',
        image: 'assets/images/products/smartwatch.jpg',
        productSummary: { 
          price: { price: 299.99 },
          hasDiscount: false
        },
        avgRatings: 4.7,
        totalReviews: 89,
        category: 'electronics',
        inStock: true
      },
      {
        id: 'product-3',
        name: 'Portable Bluetooth Speaker',
        description: 'Compact speaker with powerful sound and waterproof design. Perfect for outdoor adventures.',
        image: 'assets/images/products/speaker.jpg',
        productSummary: { 
          price: { price: 79.99, oldPrice: 99.99 },
          hasDiscount: true,
          discountPercent: 20
        },
        avgRatings: 4.3,
        totalReviews: 156,
        category: 'electronics',
        inStock: true
      },
      {
        id: 'product-4',
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with tactile switches. Designed for gaming and productivity.',
        image: 'assets/images/products/keyboard.jpg',
        productSummary: { 
          price: { price: 149.99 },
          hasDiscount: false
        },
        avgRatings: 4.6,
        totalReviews: 203,
        category: 'electronics',
        inStock: true
      },
      {
        id: 'product-5',
        name: 'Casual Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in various colors and sizes. Everyday casual wear.',
        image: 'assets/images/products/tshirt.jpg',
        productSummary: { 
          price: { price: 24.99, oldPrice: 34.99 },
          hasDiscount: true,
          discountPercent: 29
        },
        avgRatings: 4.2,
        totalReviews: 87,
        category: 'fashion',
        inStock: true
      },
      {
        id: 'product-6',
        name: 'Running Sneakers',
        description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
        image: 'assets/images/products/sneakers.jpg',
        productSummary: { 
          price: { price: 89.99 },
          hasDiscount: false
        },
        avgRatings: 4.4,
        totalReviews: 134,
        category: 'fashion',
        inStock: true
      },
      {
        id: 'product-7',
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with auto-brew feature and thermal carafe. Start your day right.',
        image: 'assets/images/products/coffee-maker.jpg',
        productSummary: { 
          price: { price: 129.99, oldPrice: 159.99 },
          hasDiscount: true,
          discountPercent: 19
        },
        avgRatings: 4.1,
        totalReviews: 76,
        category: 'home-garden',
        inStock: true
      },
      {
        id: 'product-8',
        name: 'Yoga Mat',
        description: 'Premium non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and exercise.',
        image: 'assets/images/products/yoga-mat.jpg',
        productSummary: { 
          price: { price: 39.99 },
          hasDiscount: false
        },
        avgRatings: 4.5,
        totalReviews: 92,
        category: 'sports',
        inStock: true
      }
    ];

    return products.slice(0, count);
  }

  getMockCategories() {
    return [
      {
        catalogName: 'Electronics',
        productCategoryId: 'electronics',
        categoryImageUrl: 'assets/images/categories/electronics.jpg',
        productCount: 245,
        categoryList: [
          { productCategoryId: 'smartphones', categoryName: 'Smartphones', productCount: 45 },
          { productCategoryId: 'laptops', categoryName: 'Laptops', productCount: 32 },
          { productCategoryId: 'headphones', categoryName: 'Headphones', productCount: 28 },
          { productCategoryId: 'cameras', categoryName: 'Cameras', productCount: 19 },
          { productCategoryId: 'tablets', categoryName: 'Tablets', productCount: 23 }
        ]
      },
      {
        catalogName: 'Fashion',
        productCategoryId: 'fashion',
        categoryImageUrl: 'assets/images/categories/fashion.jpg',
        productCount: 189,
        categoryList: [
          { productCategoryId: 'mens-clothing', categoryName: 'Men\'s Clothing', productCount: 67 },
          { productCategoryId: 'womens-clothing', categoryName: 'Women\'s Clothing', productCount: 89 },
          { productCategoryId: 'shoes', categoryName: 'Shoes', productCount: 54 },
          { productCategoryId: 'accessories', categoryName: 'Accessories', productCount: 43 }
        ]
      },
      {
        catalogName: 'Home & Garden',
        productCategoryId: 'home-garden',
        categoryImageUrl: 'assets/images/categories/home-garden.jpg',
        productCount: 156,
        categoryList: [
          { productCategoryId: 'furniture', categoryName: 'Furniture', productCount: 36 },
          { productCategoryId: 'decor', categoryName: 'Home Decor', productCount: 78 },
          { productCategoryId: 'kitchen', categoryName: 'Kitchen & Dining', productCount: 52 },
          { productCategoryId: 'garden', categoryName: 'Garden Tools', productCount: 29 }
        ]
      },
      {
        catalogName: 'Sports & Outdoors',
        productCategoryId: 'sports',
        categoryImageUrl: 'assets/images/categories/sports.jpg',
        productCount: 134,
        categoryList: [
          { productCategoryId: 'fitness', categoryName: 'Fitness Equipment', productCount: 41 },
          { productCategoryId: 'outdoor-gear', categoryName: 'Outdoor Gear', productCount: 35 },
          { productCategoryId: 'sports-apparel', categoryName: 'Sports Apparel', productCount: 58 }
        ]
      }
    ];
  }

  getMockBanners() {
    return [
      {
        type: 'banner',
        urls: ['assets/images/banners/summer-sale.jpg'],
        title: 'Summer Collection 2024',
        description: 'Discover our latest summer arrivals with up to 50% off selected items',
        imageTitle: 'Summer Sale',
        imageDescription: 'Up to 50% off',
        urlType: 'category',
        url: '/categories/summer-collection'
      },
      {
        type: 'banner',
        urls: ['assets/images/banners/tech-deals.jpg'],
        title: 'Tech Week Special',
        description: 'Latest gadgets and electronics now available at special prices',
        imageTitle: 'Tech Deals',
        imageDescription: 'Get the latest tech',
        urlType: 'category',
        url: '/categories/electronics'
      },
      {
        type: 'banner',
        urls: ['assets/images/banners/fashion-week.jpg'],
        title: 'Fashion Week Sale',
        description: 'Trendy fashion items for every style and occasion',
        imageTitle: 'Fashion Sale',
        imageDescription: 'Style meets affordability',
        urlType: 'category',
        url: '/categories/fashion'
      }
    ];
  }

  getMockCartItems() {
    return [
      {
        id: 'cart-1',
        product: this.getMockProducts(1)[0],
        quantity: 2,
        selectedVariant: null,
        addedDate: new Date()
      },
      {
        id: 'cart-2',
        product: this.getMockProducts().find(p => p.id === 'product-3'),
        quantity: 1,
        selectedVariant: null,
        addedDate: new Date()
      }
    ];
  }

  getMockProductDetail() {
    return {
      id: 'product-detail-1',
      name: 'Premium Wireless Headphones Pro',
      description: 'Experience premium sound quality with our flagship wireless headphones featuring advanced noise cancellation technology.',
      longDescription: `
        <h3>Product Features</h3>
        <ul>
          <li>Active Noise Cancellation (ANC)</li>
          <li>30-hour battery life</li>
          <li>Quick charge: 5 minutes for 3 hours playback</li>
          <li>Premium materials and comfortable design</li>
          <li>Touch controls and voice assistant support</li>
        </ul>
        <h3>Technical Specifications</h3>
        <ul>
          <li>Driver Size: 40mm</li>
          <li>Frequency Response: 20Hz - 20kHz</li>
          <li>Impedance: 32 ohms</li>
          <li>Connectivity: Bluetooth 5.0, 3.5mm jack</li>
          <li>Weight: 250g</li>
        </ul>
      `,
      images: [
        'assets/images/products/headphones-1.jpg',
        'assets/images/products/headphones-2.jpg',
        'assets/images/products/headphones-3.jpg',
        'assets/images/products/headphones-4.jpg'
      ],
      productSummary: { 
        price: { price: 299.99, oldPrice: 399.99 },
        hasDiscount: true,
        discountPercent: 25
      },
      avgRatings: 4.7,
      totalReviews: 234,
      category: 'electronics',
      inStock: true,
      stockQuantity: 15,
      variants: [
        { id: 'var-1', name: 'Black', color: '#000000', price: 299.99 },
        { id: 'var-2', name: 'White', color: '#FFFFFF', price: 299.99 },
        { id: 'var-3', name: 'Navy', color: '#001f3f', price: 319.99 }
      ],
      reviews: [
        {
          id: 'rev-1',
          userName: 'John D.',
          rating: 5,
          comment: 'Excellent sound quality and comfortable fit. Best headphones I\'ve owned!',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 'rev-2',
          userName: 'Sarah M.',
          rating: 4,
          comment: 'Great noise cancellation, perfect for travel and work.',
          date: '2024-01-10',
          verified: true
        }
      ]
    };
  }
}
