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
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @Output() goToProduct = new EventEmitter<any>();

  // Mock product data - used when product Input is not provided
  private mockProduct = {
    id: 'mock-product-1',
    name: 'Sample Product',
    description: 'This is a sample product description for demonstration purposes',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
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
    // console.log('::product', this.product);
    console.log('::product', this.productDetails?.productSummary?.product?.createdDate);

  }

  // TODO:: Move this logic to parent post confirmation on new tag logic
  get isNewProduct(): boolean {
    const createdAt = this.productDetails?.productSummary?.product?.createdDate;
    if(!createdAt) return false;
    const now = Date.now(); // current time in ms
    // const newThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
    const newThreshold = 1500 * 24 * 60 * 60 * 1000; // 1500 days in ms for testing
    return (now - createdAt) < newThreshold;
  }

}
