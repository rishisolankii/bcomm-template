import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getMockProducts(count: number = 8) {
    const products = [
      {
        id: 'product-1',
        name: 'Premium Wireless Headphones',
        description:
          'High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 199.99, oldPrice: 249.99 },
          hasDiscount: true,
          discountPercent: 20,
        },
        avgRatings: 4.5,
        totalReviews: 128,
        category: 'electronics',
        inStock: true,
      },
      {
        id: 'product-2',
        name: 'Smart Fitness Watch',
        description:
          'Advanced smartwatch with health monitoring, GPS tracking, and long battery life. Track your fitness goals.',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 299.99 },
          hasDiscount: false,
        },
        avgRatings: 4.7,
        totalReviews: 89,
        category: 'electronics',
        inStock: true,
      },
      {
        id: 'product-3',
        name: 'Portable Bluetooth Speaker',
        description:
          'Compact speaker with powerful sound and waterproof design. Perfect for outdoor adventures.',
        image:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 79.99, oldPrice: 99.99 },
          hasDiscount: true,
          discountPercent: 20,
        },
        avgRatings: 4.3,
        totalReviews: 156,
        category: 'electronics',
        inStock: true,
      },
      {
        id: 'product-4',
        name: 'Gaming Mechanical Keyboard',
        description:
          'RGB backlit mechanical keyboard with tactile switches. Designed for gaming and productivity.',
        image:
          'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 149.99 },
          hasDiscount: false,
        },
        avgRatings: 4.6,
        totalReviews: 203,
        category: 'electronics',
        inStock: true,
      },
      {
        id: 'product-5',
        name: 'Casual Cotton T-Shirt',
        description:
          'Comfortable 100% cotton t-shirt available in various colors and sizes. Everyday casual wear.',
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 24.99, oldPrice: 34.99 },
          hasDiscount: true,
          discountPercent: 29,
        },
        avgRatings: 4.2,
        totalReviews: 87,
        category: 'fashion',
        inStock: true,
      },
      {
        id: 'product-6',
        name: 'Running Sneakers',
        description:
          'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 89.99 },
          hasDiscount: false,
        },
        avgRatings: 4.4,
        totalReviews: 134,
        category: 'fashion',
        inStock: true,
      },
      {
        id: 'product-7',
        name: 'Coffee Maker',
        description:
          'Programmable coffee maker with auto-brew feature and thermal carafe. Start your day right.',
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 129.99, oldPrice: 159.99 },
          hasDiscount: true,
          discountPercent: 19,
        },
        avgRatings: 4.1,
        totalReviews: 76,
        category: 'home-garden',
        inStock: true,
      },
      {
        id: 'product-8',
        name: 'Yoga Mat',
        description:
          'Premium non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and exercise.',
        image:
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
        productSummary: {
          price: { price: 39.99 },
          hasDiscount: false,
        },
        avgRatings: 4.5,
        totalReviews: 92,
        category: 'sports',
        inStock: true,
      },
    ];

    return products.slice(0, count);
  }

  getMockCategories() {
    return [
      {
        catalogName: 'Electronics',
        productCategoryId: 'electronics',
        categoryImageUrl:
          'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop&crop=center',
        productCount: 245,
        categoryList: [
          {
            productCategoryId: 'smartphones',
            categoryName: 'Smartphones',
            productCount: 45,
          },
          {
            productCategoryId: 'laptops',
            categoryName: 'Laptops',
            productCount: 32,
          },
          {
            productCategoryId: 'headphones',
            categoryName: 'Headphones',
            productCount: 28,
          },
          {
            productCategoryId: 'cameras',
            categoryName: 'Cameras',
            productCount: 19,
          },
          {
            productCategoryId: 'tablets',
            categoryName: 'Tablets',
            productCount: 23,
          },
        ],
      },
      {
        catalogName: 'Fashion',
        productCategoryId: 'fashion',
        categoryImageUrl:
          'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop&crop=center',
        productCount: 189,
        categoryList: [
          {
            productCategoryId: 'mens-clothing',
            categoryName: "Men's Clothing",
            productCount: 67,
          },
          {
            productCategoryId: 'womens-clothing',
            categoryName: "Women's Clothing",
            productCount: 89,
          },
          {
            productCategoryId: 'shoes',
            categoryName: 'Shoes',
            productCount: 54,
          },
          {
            productCategoryId: 'accessories',
            categoryName: 'Accessories',
            productCount: 43,
          },
        ],
      },
      {
        catalogName: 'Home & Garden',
        productCategoryId: 'home-garden',
        categoryImageUrl:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop&crop=center',
        productCount: 156,
        categoryList: [
          {
            productCategoryId: 'furniture',
            categoryName: 'Furniture',
            productCount: 36,
          },
          {
            productCategoryId: 'decor',
            categoryName: 'Home Decor',
            productCount: 78,
          },
          {
            productCategoryId: 'kitchen',
            categoryName: 'Kitchen & Dining',
            productCount: 52,
          },
          {
            productCategoryId: 'garden',
            categoryName: 'Garden Tools',
            productCount: 29,
          },
        ],
      },
      {
        catalogName: 'Sports & Outdoors',
        productCategoryId: 'sports',
        categoryImageUrl:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&crop=center',
        productCount: 134,
        categoryList: [
          {
            productCategoryId: 'fitness',
            categoryName: 'Fitness Equipment',
            productCount: 41,
          },
          {
            productCategoryId: 'outdoor-gear',
            categoryName: 'Outdoor Gear',
            productCount: 35,
          },
          {
            productCategoryId: 'sports-apparel',
            categoryName: 'Sports Apparel',
            productCount: 58,
          },
        ],
      },
    ];
  }

  getMockPopularCategories() {
    return [
      {
        categoryName: 'Electronics',
        entity: 
          {
            categoryName: 'Electronics',
            productCategoryId: 'electronics',
            linkOneImageUrl: 'https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            productCount: 245
          }
      },
      {
        categoryName: 'Fashion',
        entity: {
          categoryName: 'Fashion',
          productCategoryId: 'fashion',
          linkOneImageUrl: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
          productCount: 189
        }
      },
      {
        categoryName: 'Home & Garden',
        entity: {
          categoryName: 'Home & Garden',
          productCategoryId: 'home-garden',
          linkOneImageUrl: 'https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGFuZCUyMGdhcmRlbnxlbnwwfHwwfHx8MA%3D%3D',
          productCount: 156
        }
      },
      {
        categoryName: 'Sports & Outdoors',
        entity: {
          categoryName: 'Sports & Outdoors',
          productCategoryId: 'sports',
          linkOneImageUrl: 'https://images.unsplash.com/photo-1722003185511-e9320e4a5d00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHNwb3J0cyUyMGFuZCUyMG91dGRvb3IlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
          productCount: 134
        }
      }
    ];
  }

  getMockBanners() {
    return [
      {
        type: 'banner',
        urls: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center',
        ],
        title: 'Summer Collection 2024',
        description:
          'Discover our latest summer arrivals with up to 50% off selected items',
        imageTitle: 'Summer Sale',
        imageDescription: 'Up to 50% off',
        urlType: 'category',
        url: '/categories/summer-collection',
      },
      {
        type: 'banner',
        urls: [
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop&crop=center',
        ],
        title: 'Tech Week Special',
        description:
          'Latest gadgets and electronics now available at special prices',
        imageTitle: 'Tech Deals',
        imageDescription: 'Get the latest tech',
        urlType: 'category',
        url: '/categories/electronics',
      },
      {
        type: 'banner',
        urls: [
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop&crop=center',
        ],
        title: 'Fashion Week Sale',
        description: 'Trendy fashion items for every style and occasion',
        imageTitle: 'Fashion Sale',
        imageDescription: 'Style meets affordability',
        urlType: 'category',
        url: '/categories/fashion',
      },
    ];
  }

  getMockCartItems() {
    return [
      {
        id: 'cart-1',
        product: this.getMockProducts(1)[0],
        quantity: 2,
        selectedVariant: null,
        addedDate: new Date(),
      },
      {
        id: 'cart-2',
        product: this.getMockProducts().find((p) => p.id === 'product-3'),
        quantity: 1,
        selectedVariant: null,
        addedDate: new Date(),
      },
    ];
  }

  getMockProductDetail() {
    return {
      id: 'product-detail-1',
      title: 'Premium Wireless Headphones Pro',
      name: 'Premium Wireless Headphones Pro',
      description:
        'Experience premium sound quality with our flagship wireless headphones featuring advanced noise cancellation technology.',
      product: {
        description:
          'Experience premium sound quality with our flagship wireless headphones featuring advanced noise cancellation technology.',
          longDescription: `
            <h5>Product Features</h5>
            <ul>
              <li>Active Noise Cancellation (ANC)</li>
              <li>30-hour battery life</li>
              <li>Quick charge: 5 minutes for 3 hours playback</li>
              <li>Premium materials and comfortable design</li>
              <li>Touch controls and voice assistant support</li>
            </ul>
            <h5>Technical Specifications</h5>
            <ul>
              <li>Driver Size: 40mm</li>
              <li>Frequency Response: 20Hz - 20kHz</li>
              <li>Impedance: 32 ohms</li>
              <li>Connectivity: Bluetooth 5.0, 3.5mm jack</li>
              <li>Weight: 250g</li>
            </ul>
          `,
      },
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center',
      ],
      productSummary: {
        price: { price: 299.99, oldPrice: 399.99 },
        hasDiscount: true,
        discountPercent: 25,
      },
      averageRating: 4.7,
      totalReviews: 234,
      category: 'electronics',
      inStock: true,
      stockQuantity: 15,
      variants: [
        { id: 'var-1', name: 'Black', color: '#000000', price: 299.99 },
        { id: 'var-2', name: 'White', color: '#FFFFFF', price: 299.99 },
        { id: 'var-3', name: 'Navy', color: '#001f3f', price: 319.99 },
      ],
      productReviews: [
        {
          id: 'rev-1',
          userLoginId: 'John D.',
          productRating: 5,
          productReview:
            "Excellent sound quality and comfortable fit. Best headphones I've owned!",
          createdStamp: '2024-01-15',
          verified: true,
        },
        {
          id: 'rev-2',
          userLoginId: 'Sarah M.',
          productRating: 4,
          productReview: 'Great noise cancellation, perfect for travel and work.',
          createdStamp: '2024-01-10',
          verified: true,
        },
      ],
    };
  }

  getMockStoreDetails() {
    return {
      logo: 'https://placehold.co/200x80/00522e/FFF?text=Logo',
      companyName: 'Demo Store',
      companyAddress: {
        address1: '123 Commerce Street',
        address2: 'Downtown',
        countryGeoId: 'US',
        city: 'New York',
        postalCode: '10001',
      },
      companyContact: {
        countryCode: '+1',
        areaCode: '(555)',
        contactNumber: '123-4567',
      },
      companyEmail: 'info@demostore.com',
    };
  }
}
