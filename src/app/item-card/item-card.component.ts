import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent implements OnInit {
  @Input() product!: any;
  @Input() isLoading: boolean = false;
  @Input() isSearch = false;
  @Input() productDetails!: any;

  @Output() goToProduct = new EventEmitter<any>();

  // Mock product data - used when product Input is not provided
  private mockProduct = {
    id: 'mock-product-1',
    name: 'Sample Product',
    description: 'This is a sample product description for demonstration purposes',
    image: 'assets/images/no-product-image.png',
    productSummary: { 
      price: { price: 99.99, oldPrice: 129.99 },
      hasDiscount: true,
      discountPercent: 23
    },
    avgRatings: 4.2,
    totalReviews: 45
  };

  goToProductDetails(product: any) {
    this.goToProduct.emit(product);
  }

  ngOnInit(): void {
    // Use mock data if no product is provided
    if (!this.product) {
      this.product = this.mockProduct;
    }
    // console.log('::productDetails', this.productDetails);
  }
}
