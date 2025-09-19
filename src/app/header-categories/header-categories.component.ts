import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrl: './header-categories.component.scss',
})
export class HeaderCategoriesComponent {
  @Input() showOverlay: any;
  @Input() selectedCategoryId!: any;
  @Input() categories: any;
  @Input() menuCmsData: any;
  @Input() defaultProductImage: any;
  @Output() categoryOverlayId = new EventEmitter<any>();
  @Output() subcategoryId = new EventEmitter<any>();
  @Output() pageUrl = new EventEmitter<any>();

  ngOnInit() {
    // Set default categories if not provided
    if (!this.categories || this.categories.length === 0) {
      this.categories = [
        {
          catalogName: 'Electronics',
          productCategoryId: 'electronics',
          categoryList: [
            { productCategoryId: 'smartphones', categoryName: 'Smartphones', productCount: 45 },
            { productCategoryId: 'laptops', categoryName: 'Laptops', productCount: 32 },
            { productCategoryId: 'headphones', categoryName: 'Headphones', productCount: 28 },
            { productCategoryId: 'cameras', categoryName: 'Cameras', productCount: 19 }
          ]
        },
        {
          catalogName: 'Fashion',
          productCategoryId: 'fashion',
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
          categoryList: [
            { productCategoryId: 'furniture', categoryName: 'Furniture', productCount: 36 },
            { productCategoryId: 'decor', categoryName: 'Home Decor', productCount: 78 },
            { productCategoryId: 'kitchen', categoryName: 'Kitchen & Dining', productCount: 52 },
            { productCategoryId: 'garden', categoryName: 'Garden Tools', productCount: 29 }
          ]
        },
        {
          catalogName: 'Sports',
          productCategoryId: 'sports',
          categoryList: [
            { productCategoryId: 'fitness', categoryName: 'Fitness Equipment', productCount: 41 },
            { productCategoryId: 'outdoor', categoryName: 'Outdoor Gear', productCount: 35 },
            { productCategoryId: 'sports-apparel', categoryName: 'Sports Apparel', productCount: 58 }
          ]
        }
      ];
    }

    if (!this.defaultProductImage) {
      this.defaultProductImage = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
  }

  openCategoryOverlay(id: any) {
    this.categoryOverlayId.emit(id);
  }

  redirectBySubcategory(id: any) {
    this.subcategoryId.emit(id);
  }

  redirectByPageUrl(url: any) {
    this.pageUrl.emit(url);
  }
}
