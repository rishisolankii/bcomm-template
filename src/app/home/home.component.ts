import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() heroBannerType: any;
  @Input() bannersDetail: any;
  @Input() foundBanner!: any;
  @Input() storeTheme: any;
  @Input() mostPopularCategory: any;
  @Input() promotionCategory: any;
  @Input() popularCategories: any;
  @Input() topPicks: any;
  @Input() bestsellers: any;
  @Input() showLoading: any;
  @Input() mediaBaseUrl: any;
  @Input() promotionList: any;
  @Input() bannerOne: any;
  @Input() bannerTwo: any;
  @Input() bannerThree: any;
  @Input() bannerFour: any;
  @Input() bannerFive: any;
  @Input() bannerSix: any;

  @Output() bannerUrl = new EventEmitter<any>();
  @Output() goToBanner = new EventEmitter<any>();
  @Output() categoryRedirection = new EventEmitter<any>();
  @Output() productRedirection = new EventEmitter<any>();
  @Input() themeComponent: 'autoparts' | 'full' | 'modern' | null = null;

  brands = [
    {
      title: 'Brand 01',
      logo: '/assets/images/brands/01.png'
    },
    {
      title: 'Brand 02',
      logo: '/assets/images/brands/02.png'
    },
    {
      title: 'Brand 03',
      logo: '/assets/images/brands/03.png'
    },
    {
      title: 'Brand 04',
      logo: '/assets/images/brands/04.png'
    },
    {
      title: 'Brand 05',
      logo: '/assets/images/brands/05.png'
    },
    {
      title: 'Brand 06',
      logo: '/assets/images/brands/06.png'
    },
  ]

  // Mock data - only used when Input data is not provided
  private mockBannersDetail = [
    {
      type: 'banner',
      urls: ['assets/images/hero-banner-1.jpg'],
      title: 'Summer Collection 2024',
      description: 'Discover our latest summer arrivals with up to 50% off',
      imageTitle: 'Summer Sale',
      imageDescription: 'Up to 50% off on selected items',
      urlType: 'category',
      url: '/categories/summer-collection'
    },
    {
      type: 'banner',
      urls: ['assets/images/hero-banner-2.jpg'],
      title: 'New Electronics',
      description: 'Latest gadgets and electronics now available',
      imageTitle: 'Tech Sale',
      imageDescription: 'Get the latest tech at great prices',
      urlType: 'category',
      url: '/categories/electronics'
    }
  ];

  private mockTopPicks = [
    {
      id: 'product-1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'assets/images/products/headphones.jpg',
      productSummary: { 
        price: { price: 199.99, oldPrice: 249.99 },
        hasDiscount: true,
        discountPercent: 20
      },
      avgRatings: 4.5,
      totalReviews: 128
    },
    {
      id: 'product-2',
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with this advanced smartwatch',
      image: 'assets/images/products/smartwatch.jpg',
      productSummary: { 
        price: { price: 299.99 },
        hasDiscount: false
      },
      avgRatings: 4.7,
      totalReviews: 89
    },
    {
      id: 'product-3',
      name: 'Portable Bluetooth Speaker',
      description: 'Compact speaker with powerful sound and long battery life',
      image: 'assets/images/products/speaker.jpg',
      productSummary: { 
        price: { price: 79.99, oldPrice: 99.99 },
        hasDiscount: true,
        discountPercent: 20
      },
      avgRatings: 4.3,
      totalReviews: 156
    },
    {
      id: 'product-4',
      name: 'Gaming Mechanical Keyboard',
      description: 'RGB mechanical keyboard perfect for gaming and typing',
      image: 'assets/images/products/keyboard.jpg',
      productSummary: { 
        price: { price: 149.99 },
        hasDiscount: false
      },
      avgRatings: 4.6,
      totalReviews: 203
    }
  ];

  private mockPopularCategories = [
    {
      catalogName: 'Electronics',
      productCategoryId: 'electronics',
      categoryImageUrl: 'assets/images/categories/electronics.jpg',
      productCount: 245,
      categoryList: [
        { productCategoryId: 'smartphones', categoryName: 'Smartphones' },
        { productCategoryId: 'laptops', categoryName: 'Laptops' },
        { productCategoryId: 'headphones', categoryName: 'Headphones' }
      ]
    },
    {
      catalogName: 'Fashion',
      productCategoryId: 'fashion',
      categoryImageUrl: 'assets/images/categories/fashion.jpg',
      productCount: 189,
      categoryList: [
        { productCategoryId: 'mens-clothing', categoryName: 'Men\'s Clothing' },
        { productCategoryId: 'womens-clothing', categoryName: 'Women\'s Clothing' },
        { productCategoryId: 'shoes', categoryName: 'Shoes' }
      ]
    },
    {
      catalogName: 'Home & Garden',
      productCategoryId: 'home-garden',
      categoryImageUrl: 'assets/images/categories/home-garden.jpg',
      productCount: 156,
      categoryList: [
        { productCategoryId: 'furniture', categoryName: 'Furniture' },
        { productCategoryId: 'decor', categoryName: 'Home Decor' },
        { productCategoryId: 'garden', categoryName: 'Garden Tools' }
      ]
    },
    {
      catalogName: 'Sports & Outdoors',
      productCategoryId: 'sports',
      categoryImageUrl: 'assets/images/categories/sports.jpg',
      productCount: 134,
      categoryList: [
        { productCategoryId: 'fitness', categoryName: 'Fitness Equipment' },
        { productCategoryId: 'outdoor-gear', categoryName: 'Outdoor Gear' },
        { productCategoryId: 'sports-apparel', categoryName: 'Sports Apparel' }
      ]
    }
  ];

  ngOnInit() {
    // Use Input data if available, otherwise use mock data
    if (!this.bannersDetail || this.bannersDetail.length === 0) {
      this.bannersDetail = this.mockBannersDetail;
    }
    
    if (!this.topPicks || this.topPicks.length === 0) {
      this.topPicks = this.mockTopPicks;
    }
    
    if (!this.bestsellers || this.bestsellers.length === 0) {
      this.bestsellers = this.mockTopPicks; // Reuse for demo
    }
    
    if (!this.popularCategories || this.popularCategories.length === 0) {
      this.popularCategories = this.mockPopularCategories;
    }

    // Set default theme if not provided
    if (!this.themeComponent) {
      this.themeComponent = 'modern';
    }

    console.log(
      'bannersDetail-',
      this.bannersDetail,
      'themeComponent-',
      this.themeComponent
    );
  }

  goToBannerURL(banner: any) {
    this.goToBanner.emit(banner);
  }

  goToURL(item?: any) {
    this.bannerUrl.emit(item);
  }
  goToCategory(id: string) {
    this.categoryRedirection.emit(id);
  }
  goToProduct(id: any) {
    this.productRedirection.emit(id);
  }
}
