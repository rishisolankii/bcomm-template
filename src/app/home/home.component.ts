import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, isDevMode } from '@angular/core';
import { remoteAsset } from '../utils/remote-asset';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnChanges {
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
      logo: remoteAsset('images/brands/01.png')
    },
    {
      title: 'Brand 02',
      logo: remoteAsset('images/brands/02.png')
    },
    {
      title: 'Brand 03',
      logo: remoteAsset('images/brands/03.png')
    },
    {
      title: 'Brand 04',
      logo: remoteAsset('images/brands/04.png')
    },
    {
      title: 'Brand 05',
      logo: remoteAsset('images/brands/05.png')
    },
    {
      title: 'Brand 06',
      logo: remoteAsset('images/brands/06.png')
    },
  ]

  // Mock data - only used when Input data is not provided
  private mockBannersDetail = [
    {
      type: 'banner',
      urls: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop&crop=center'],
      title: 'Summer Collection 2024',
      description: 'Discover our latest summer arrivals with up to 50% off',
      imageTitle: 'Summer Sale',
      imageDescription: 'Up to 50% off on selected items',
      urlType: 'category',
      url: '/categories/summer-collection'
    },
    {
      type: 'banner',
      urls: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=500&fit=crop&crop=center'],
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
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
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
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
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
  // Usage Example for Static Assets
  staticBanner = remoteAsset('images/temp_full-banner.jpeg');

  constructor(private mockDataService: MockDataService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Re-initialize data when inputs change
    if (changes['bannersDetail'] || changes['foundBanner'] || changes['topPicks'] || changes['bestsellers']) {
      this.initializeData();
    }
  }

  ngOnInit() {
    // Ensure all required data is available
    this.initializeData();
    
    console.log(
      'HOME COMPONENT DATA:',
      'bannersDetail-', this.bannersDetail,
      'foundBanner-', this.foundBanner,
      'topPicks-', this.topPicks,
      'bestsellers-', this.bestsellers,
      'popularCategories-', this.popularCategories,
    );
  }

  private initializeData() {
    // Use Input data if available, otherwise use mock data from service
    if (!this.bannersDetail || this.bannersDetail.length === 0) {
      this.bannersDetail = this.mockDataService.getMockBanners();
    }
    
    if (!this.topPicks || this.topPicks.length === 0 && isDevMode()) {
      this.topPicks = this.mockDataService.getMockProducts(8);
    }
    
    if (!this.bestsellers || this.bestsellers.length === 0 && isDevMode()) {
      this.bestsellers = this.mockDataService.getMockProducts(8);
    }
    
    if (!this.popularCategories || this.popularCategories.length === 0 && isDevMode()) {
      this.popularCategories = this.mockDataService.getMockPopularCategories();
    }

    // Set default banner if not provided - ensure it's always available
    if (!this.foundBanner && this.bannersDetail && this.bannersDetail.length > 0) {
      this.foundBanner = this.bannersDetail[0];
    } else if (!this.foundBanner) {
      this.foundBanner = this.mockDataService.getMockBanners()[0];
    }
    
    if(!this.bannerOne) {
      this.bannerOne = this.mockDataService.getMockBanners()[0];
    }
  }

  getCategoryImage(category: any): string {
    const imageUrl = category?.entity?.linkOneImageUrl;

    if (!imageUrl) {
      return 'assets/images/no-product-image.png';
    }

    return imageUrl.startsWith('http')
      ? imageUrl
      : category.entity.linkOneImageUrlS3 || 'assets/images/no-product-image.png';
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
