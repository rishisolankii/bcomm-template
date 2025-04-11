import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.scss',
})
export class EmptyCartComponent {
  @Output() redirectToHome = new EventEmitter<any>();

  onRedirectToHome() {
    this.redirectToHome.emit(true);
  }
}
