import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  @Input() storeLogo: any = 'assets/images/logo.png';
  @Input() cmsData: any;
  @Input() defaultStoreLogoUrl =
    'https://tenant-prod.enterprisehub.io/public/logo/logo.png';

  @Output() search = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();

  searchProducts(e: any) {
    this.search.emit(e);
  }
  onLogout() {
    this.logout.emit();
  }
}
