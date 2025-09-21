import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  @Input() categoryId!: string;
  @Input() subCategories: any[] = [];
  // @Input() products: object[] = [];
  @Input() products: any[] = [];
  @Input() categoryBanner: any;
  @Input() categoryName: any;
  @Input() categoryDescription: any;
  @Input() swiperOptions: any;
  @Input() searchText: any;
  @Input() reachedMaximum = false;
  @Input() showLoading = false;
  @Input() featuredPorducts: any;

  @Output() getProducts = new EventEmitter<any>();
  @Output() getMoreProducts = new EventEmitter<any>();
  @Output() searchTextChanged = new EventEmitter<any>();

  // For Banner Section
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() description!: string;
  @Input() ctaType!: string;
  @Input() ctaLabel!: string;
  @Input() mediaURL!: string;
  @Input() bgColor!: string;
  @Input() bannerData!: any;
  @Input() searchPlaceHolder: any;
  @Output() goToBanner = new EventEmitter<any>();
  @Input() filters: any = {};
  @Input() filterList: any;
  @Input() selectedFilters: any = {};
  @Output() deselectRadioBtn$ = new EventEmitter<any>();
  @Output() onApplyFilter$ = new EventEmitter<any>();
  @Output() clearFilter$ = new EventEmitter<any>();
  objectKeys = Object.keys;
  @Input() minPrice: any = new FormControl();
  @Input() maxPrice: any = new FormControl();
  @Input() sortingOptions: any = [];
  @Input() selectedSorting: any = 'SortKeywordRelevancy';
  @Output() selectSorting$ = new EventEmitter<any>();
  @Output() subCategoryProductId = new EventEmitter<any>();
  @Output() productId = new EventEmitter<any>();
  @Output() goToProduct = new EventEmitter<any>();
  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();
  @Output() changeFilter$ = new EventEmitter<any>();
  @Output() getLabel$ = new EventEmitter<any>();
  @Input() sortingLabel!: any;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    // Set default category data if not provided
    if (!this.categoryName) {
      this.categoryName = 'Electronics';
    }
    
    if (!this.categoryDescription) {
      this.categoryDescription = 'Discover the latest electronics and gadgets at unbeatable prices.';
    }

    if (!this.products || this.products.length === 0) {
      this.products = this.mockDataService.getMockProducts();
    }

    if (!this.subCategories || this.subCategories.length === 0) {
      this.subCategories = [
        {
          productCategoryId: 'smartphones',
          categoryName: 'Smartphones',
          productCount: 45,
          entity: {
            displayImage:
              'https://images.unsplash.com/photo-1642326656890-0dfbea690cd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHNwb3J0cyUyMGFuZCUyMG91dGRvb3IlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
          },
        },
        {
          productCategoryId: 'laptops',
          categoryName: 'Laptops',
          productCount: 32,
          entity: {
            displayImage:
              'https://images.unsplash.com/photo-1642326656890-0dfbea690cd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHNwb3J0cyUyMGFuZCUyMG91dGRvb3IlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
          },
        },
        {
          productCategoryId: 'headphones',
          categoryName: 'Headphones',
          productCount: 28,
          entity: {
            displayImage:
              'https://images.unsplash.com/photo-1642326656890-0dfbea690cd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHNwb3J0cyUyMGFuZCUyMG91dGRvb3IlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
          },
        },
        {
          productCategoryId: 'cameras',
          categoryName: 'Cameras',
          productCount: 19,
          entity: {
            displayImage:
              'https://images.unsplash.com/photo-1642326656890-0dfbea690cd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHNwb3J0cyUyMGFuZCUyMG91dGRvb3IlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
          },
        },
      ];
    }

    if (!this.categoryBanner) {
      this.categoryBanner = {
        type: 'category-banner',
        urls: ['https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop&crop=center'],
        title: this.categoryName,
        description: this.categoryDescription
      };
    }

    // Set default banner section data
    if (!this.title) {
      this.title = 'Special Category Offer';
    }
    if (!this.subtitle) {
      this.subtitle = 'Limited Time Deal';
    }
    if (!this.description) {
      this.description = 'Don\'t miss out on amazing deals in this category!';
    }
    if (!this.ctaLabel) {
      this.ctaLabel = 'Shop Now';
    }
    if (!this.mediaURL) {
      this.mediaURL = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center';
    }
    if (!this.bgColor) {
      this.bgColor = '#007bff';
    }

    // Set default filters if not provided
    if (!this.filterList || Object.keys(this.filterList).length === 0) {
      this.filterList = {
        'Price Range': [
          { label: 'Under $50', value: '0-50', count: 23 },
          { label: '$50 - $100', value: '50-100', count: 45 },
          { label: '$100 - $200', value: '100-200', count: 67 },
          { label: 'Over $200', value: '200+', count: 34 }
        ],
        'Brand': [
          { label: 'Apple', value: 'apple', count: 12 },
          { label: 'Samsung', value: 'samsung', count: 18 },
          { label: 'Sony', value: 'sony', count: 15 },
          { label: 'LG', value: 'lg', count: 9 }
        ],
        'Rating': [
          { label: '4 Stars & Up', value: '4+', count: 89 },
          { label: '3 Stars & Up', value: '3+', count: 156 },
          { label: '2 Stars & Up', value: '2+', count: 178 }
        ]
      };
    }

    // Set default sorting options
    if (!this.sortingOptions || this.sortingOptions.length === 0) {
      this.sortingOptions = [
        { label: 'Relevance', value: 'SortKeywordRelevancy' },
        { label: 'Price: Low to High', value: 'SortPriceLowToHigh' },
        { label: 'Price: High to Low', value: 'SortPriceHighToLow' },
        { label: 'Customer Rating', value: 'SortCustomerRating' },
        { label: 'Newest First', value: 'SortNewestFirst' }
      ];
    }

    if (!this.searchPlaceHolder) {
      this.searchPlaceHolder = 'products...';
    }

    if (!this.sortingLabel) {
      this.sortingLabel = 'Sort by:';
    }
  }

  onRedirectToUrl(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
  goToBannerURL() {
    this.goToBanner.emit();
  }
  goToProductDetails(product: any) {
    this.goToProduct.emit(product);
  }
  fetchProducts(isSearch?: boolean) {
    this.getProducts.emit(isSearch);
  }
  fetchMoreProducts() {
    this.getMoreProducts.emit();
  }

  onChange(e: any) {
    this.searchTextChanged.emit(e);
    // this.searchTextChanged.emit(this.searchText);
  }

  deselectRadioBtn(filterKey: string, selectedValue: string) {
    this.deselectRadioBtn$.emit({
      filterKey,
      selectedValue,
    });
  }

  clearFilter() {
    this.clearFilter$.emit();
  }

  onApplyFilter() {
    this.onApplyFilter$.emit();
  }

  onChangeFilter($event: any, productFeatureId: string) {
    this.changeFilter$.emit({ $event, productFeatureId });
  }

  selectSorting(value: string) {
    this.selectSorting$.emit(value);
  }
  onRedirectToProduct(id: string) {
    this.subCategoryProductId.emit(id);
  }
  redirectToDetails(id: any) {
    this.productId.emit(id);
  }
}
