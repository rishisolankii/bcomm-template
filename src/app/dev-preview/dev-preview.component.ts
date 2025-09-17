import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-dev-preview',
  template: `
    <div class="dev-preview">
      <!-- Navigation for different views -->
      <div class="dev-nav">
        <h3>Template Preview</h3>
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
        [storeLogo]="'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&crop=center'"
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
          *ngIf="currentView === 'home'" 
          [bannersDetail]="mockBanners"
          [topPicks]="mockProducts"
          [bestsellers]="[]"
          [popularCategories]="mockCategories"
          [themeComponent]="'modern'"
          [heroBannerType]="'default'"
          [foundBanner]="mockBanners[0]">
        </app-home>
        
        <!-- Product Detail View -->
        <div *ngIf="currentView === 'product'" class="container">
          <app-breadcrumb
            [inactiveElements]="[{ label: 'Home', redirectUrl: '' }, { label: 'Electronics', redirectUrl: 'electronics' }]"
            [activeElement]="'Premium Wireless Headphones'">
          </app-breadcrumb>
          <app-product-detail></app-product-detail>
        </div>
        
        <!-- Category View -->
        <div *ngIf="currentView === 'category'" class="container">
          <app-breadcrumb
            [inactiveElements]="[{ label: 'Home', redirectUrl: '' }]"
            [activeElement]="'Electronics'">
          </app-breadcrumb>
          <app-categories></app-categories>
        </div>
        
        <!-- Cart View -->
        <div *ngIf="currentView === 'cart'" class="container">
          <app-breadcrumb
            [inactiveElements]="[{ label: 'Home', redirectUrl: '' }]"
            [activeElement]="'Shopping Cart'">
          </app-breadcrumb>
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
  
  mockTopCmsData = [
    { pageTitle: 'Help & FAQ', pageUrl: '/help' },
    { pageTitle: 'Contact Us', pageUrl: '/contact' },
    { pageTitle: 'Track Order', pageUrl: '/track-order' }
  ];

  mockCategories: any[] = [];
  mockProducts: any[] = [];
  mockBanners: any[] = [];
  mockCartCount = 3;

  constructor(
    private mockDataService: MockDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mockCategories = this.mockDataService.getMockCategories();
    this.mockProducts = this.mockDataService.getMockProducts(8);
    this.mockBanners = this.mockDataService.getMockBanners();
  }

  ngOnInit() {
    // Check for view query parameter on init
    this.route.queryParams.subscribe(params => {
      if (params['view']) {
        this.currentView = params['view'];
      }
    });
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
}
