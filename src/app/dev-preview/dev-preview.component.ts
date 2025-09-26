import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-dev-preview',
  template: `
    <div class="dev-preview">
      <!-- Navigation for different views -->
      <div class="dev-nav">
        <h4>Template Preview</h4>
        <div class="nav-buttons">
          <button 
            (click)="setCurrentView('home')" 
            [class.active]="currentView === 'home'"
            class="nav-btn">
            Home
          </button>
          <button 
            (click)="setCurrentView('product')" 
            [class.active]="currentView === 'product'"
            class="nav-btn">
            Product Detail
          </button>
          <button 
            (click)="setCurrentView('category')" 
            [class.active]="currentView === 'category'"
            class="nav-btn">
            Category
          </button>
          <button 
            (click)="setCurrentView('cart')" 
            [class.active]="currentView === 'cart'"
            class="nav-btn">
            Cart
          </button>
          <button 
            (click)="setCurrentView('contact')" 
            [class.active]="currentView === 'contact'"
            class="nav-btn">
            Contact
          </button>
        </div>
      </div>
      
      <!-- Header (always visible) -->
      <app-header-top-strip 
        [promotionTitle]="'Free shipping on orders over $50!'"
        [topCmsData]="mockTopCmsData">
      </app-header-top-strip>
      
      <app-header 
        [storeLogo]="mockLogo"
        [cartItemCount]="mockCartCount"
        [isLogin]="false">
      </app-header>
      
      <app-header-categories 
        [categories]="mockCategories">
      </app-header-categories>
      
      <!-- Dynamic content based on current view -->
      <div class="dev-content">
        <!-- Home View -->
        <app-home 
          *ngIf="currentView === 'home' && isDataLoaded && mockBanners.length > 0" 
          [bannersDetail]="mockBanners"
          [topPicks]="mockProducts"
          [bestsellers]="mockProducts"
          [popularCategories]="mockPopularCategories"
          [themeComponent]="'modern'"
          [heroBannerType]="'default'"
          [foundBanner]="firstBanner">
        </app-home>

        <!-- Loading state for home -->
        <div *ngIf="currentView === 'home' && (!isDataLoaded || mockBanners.length === 0)" class="container">
          <div class="text-center p-5">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading home content...</p>
          </div>
        </div>
        
        <!-- Product Detail View -->
        <div *ngIf="currentView === 'product'" class="container">
          <app-product-detail></app-product-detail>
        </div>
        
        <!-- Category View -->
        <div *ngIf="currentView === 'category'" class="container">
          <!-- <app-breadcrumb
            [inactiveElements]="[{ label: 'Home', redirectUrl: '' }]"
            [activeElement]="'Electronics'">
          </app-breadcrumb> -->
          <app-categories></app-categories>
        </div>
        
        <!-- Cart View -->
        <div *ngIf="currentView === 'cart'" class="container">
          <app-cart></app-cart>
        </div>
        
        <!-- Contact View -->
        <div *ngIf="currentView === 'contact'" class="container">
          <app-contact></app-contact>
        </div>
      </div>
      
      <!-- Footer (always visible) -->
      <app-footer 
        [categories]="mockCategories"
        [companyName]="'Demo Store'"
        [companyEmail]="'info@demostore.com'">
      </app-footer>
      
      <app-footer-copyright-strip 
        [companyName]="'Demo Store'">
      </app-footer-copyright-strip>
    </div>
  `,
  styleUrls: ['./dev-preview.component.scss']
})
export class DevPreviewComponent implements OnInit {
  currentView = 'home';
  isDataLoaded = false;
  
  mockTopCmsData = [
    { pageTitle: 'Help & FAQ', pageUrl: '/help' },
    { pageTitle: 'Contact Us', pageUrl: '/contact' },
    { pageTitle: 'Track Order', pageUrl: '/track-order' }
  ];

  mockLogo!: string;

  mockCategories: any[] = [];
  mockPopularCategories: any[] = [];
  mockProducts: any[] = [];
  mockBanners: any[] = [];
  mockCartCount = 3;

  constructor(
    private mockDataService: MockDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize data immediately
    this.initializeMockData();
  }

  ngOnInit() {
    // Check for view query parameter on init
    this.route.queryParams.subscribe(params => {
      if (params['view']) {
        this.currentView = params['view'];
      }
    });
    
    // Ensure data is loaded
    if (!this.isDataLoaded) {
      this.initializeMockData();
    }
  }

  private initializeMockData() {
    this.mockCategories = this.mockDataService.getMockCategories();
    this.mockPopularCategories = this.mockDataService.getMockPopularCategories();
    this.mockProducts = this.mockDataService.getMockProducts(8);
    this.mockBanners = this.mockDataService.getMockBanners();
    this.mockLogo = this.mockDataService.getMockStoreDetails().logo;
    
    // Ensure data is fully initialized before marking as loaded
    setTimeout(() => {
      this.isDataLoaded = true;
      console.log('Mock data initialized:', {
        categories: this.mockCategories.length,
        products: this.mockProducts.length,
        banners: this.mockBanners.length,
        firstBanner: this.mockBanners[0]
      });
    }, 0);
  }

  setCurrentView(view: string) {
    this.currentView = view;
    // Update query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: view },
      queryParamsHandling: 'merge'
    });
  }

  get firstBanner() {
    return this.mockBanners && this.mockBanners.length > 0 ? this.mockBanners[0] : null;
  }
}
