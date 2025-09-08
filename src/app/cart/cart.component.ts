import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  @Input() cartDetailsList: any;
  @Input() cartItemCount = 0;
  @Input() grandTotalAmount = 0;
  // @Input() modifyCartData: any;
  @Input() bannersDetail: any[] = [];
  @Input() bannerFive: any;
  @Input() associatedProducts: any[] = [];
  @Input() showLoading: boolean = true;
  @Output() goToProduct = new EventEmitter<any>();
  @Output() changeQty = new EventEmitter<any>();
  @Output() updateBulkQty = new EventEmitter<any>();
  @Output() applyCoupon = new EventEmitter<any>();
  @Input() couponFormCtr!: FormControl;
  @Input() isCouponApplied: boolean = false;
  @Input() discountTotal: number = 0;
  @Input() subTotal: number = 0;

  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();
  @Output() redirectToHome = new EventEmitter<any>();
  @Output() onCheckoutRedirection = new EventEmitter<any>();
  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    // Set default cart data if not provided
    if (!this.cartDetailsList || this.cartDetailsList.length === 0) {
      this.showLoading = false;
      this.cartDetailsList = this.mockDataService.getMockCartItems();
      
      // Calculate totals from mock data
      this.cartItemCount = this.cartDetailsList.length;
      this.subTotal = this.cartDetailsList.reduce((total: number, item: any) => {
        return total + (item.product.productSummary.price.price * item.quantity);
      }, 0);
      this.grandTotalAmount = this.subTotal - this.discountTotal;
    }

    if (!this.bannersDetail || this.bannersDetail.length === 0) {
      this.bannersDetail = this.mockDataService.getMockBanners();
    }

    if (!this.associatedProducts || this.associatedProducts.length === 0) {
      this.associatedProducts = this.mockDataService.getMockProducts(4);
    }

    if (!this.couponFormCtr) {
      this.couponFormCtr = new FormControl('');
    }
  }

  goToProductDetails(product: any) {
    this.goToProduct.emit(product);
  }

  changeQuantity(item: any, index: number, value: number) {
    let qtyData = {
      item: item,
      index: index,
      value: value,
    };
    this.changeQty.emit(qtyData);
  }

  updateBulkQuantity(ev: any, item: any, index: number) {
    let bulkQtyData = {
      ev: ev,
      item: item,
      index: index,
    };
    this.updateBulkQty.emit(bulkQtyData);
  }

  onApplyCoupon() {
    this.applyCoupon.emit();
  }

  onRedirect(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
  onRedirectToHome() {
    this.redirectToHome.emit(true);
  }
  onCheckout() {
    this.onCheckoutRedirection.emit(true);
  }
}
