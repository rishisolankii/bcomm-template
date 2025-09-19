import { Component, EventEmitter, Input, Output } from '@angular/core';
import { templateSettings } from '../utils/configs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isLogin: boolean = false;
  @Input() userFirstName!: any;
  @Input() userType!: any;
  @Input() searchText: any;
  @Input() cartItemCount!: number;
  @Input() storeLogo: any = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&crop=center';
  @Input() cmsData: any;
  @Input() defaultStoreLogoUrl =
    'https://tenant-prod.enterprisehub.io/public/logo/logo.png';
  @Input() categories!: any;

  @Output() search = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();
  @Output() quickLogin = new EventEmitter<any>();

  // Toggle this flat in the utils/configs.ts to swith betwene Quick login model, or full page login mode
  quickLoginEnabled = templateSettings.quickLoginEnabled;

  ngOnInit() {
    // Set default values if not provided
    if (!this.storeLogo) {
      this.storeLogo = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&crop=center';
    }
    
    if (this.cartItemCount === undefined || this.cartItemCount === null) {
      this.cartItemCount = 0;
    }

    if (!this.userFirstName && this.isLogin) {
      this.userFirstName = 'Guest User';
    }
  }

  searchProducts(e: any) {
    this.search.emit(e);
  }
  onLogout() {
    this.logout.emit();
  }
  
  onQuickLogin() {
    this.quickLogin.emit();
  }
}
