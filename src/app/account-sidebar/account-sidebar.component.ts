import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.scss',
})
export class AccountSidebarComponent {
  @Input() sidebarOptions!: any[];
  @Output() onRedirectURL = new EventEmitter<any>();
  activeUrl!: string;

  ngOnInit() {
    // Set default sidebar options if not provided
    if (!this.sidebarOptions || this.sidebarOptions.length === 0) {
      this.sidebarOptions = [
        { label: 'Profile Settings', url: '/account/profile/settings', icon: 'assets/icons/user.png' },
        { label: 'Order History', url: '/order/history', icon: 'assets/icons/bag.png' },
        { label: 'Payment Methods', url: '/account/payment-methods', icon: 'assets/icons/card.png' },
        { label: 'Wishlist', url: '/account/wishlist', icon: 'assets/icons/heart.png' },
        { label: 'Address Book', url: '/account/addresses', icon: 'assets/icons/location.png' }
      ];
    }
  }
  
  onRedirection(url: string) {
    this.onRedirectURL.emit(url);
  }
}
