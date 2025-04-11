import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() cartDetailsList: any;
  @Input() cartItemCount = 0;
  @Input() grandTotalAmount = 0;
  // @Input() modifyCartData: any;
  @Input() bannersDetail: any[] = [];
  @Input() associatedProducts: any[] = [];

  @Output() goToProduct = new EventEmitter<any>();
  @Output() changeQty = new EventEmitter<any>();
  @Output() updateBulkQty = new EventEmitter<any>();
  @Output() applyCoupon = new EventEmitter<void>();
  @Input() couponFormCtr!: FormControl;
  @Input() isCouponApplied: boolean = false;
  @Input() discountTotal: number = 0;
  @Input() subTotal: number = 0;

  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();
  @Output() redirectToHome = new EventEmitter<any>();
  @Output() onCheckoutRedirection = new EventEmitter<any>();
  constructor() {
    console.log(this.cartDetailsList);
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
