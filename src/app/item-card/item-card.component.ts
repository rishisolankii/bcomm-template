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

  goToProductDetails(product: any) {
    this.goToProduct.emit(product);
  }

  ngOnInit(): void {
    // console.log('::productDetails', this.productDetails);
  }
}
