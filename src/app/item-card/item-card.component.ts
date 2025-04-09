import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input() product: any;
  @Input() isLoading: boolean = false;
  @Input() isSearch = false;
  @Input() productDetails: any;

  @Output() goToProduct = new EventEmitter<any>();

  goToProductDetails(product: any) {
    this.goToProduct.emit(product);
  }
}
