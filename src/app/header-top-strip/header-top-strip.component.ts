import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-top-strip',
  templateUrl: './header-top-strip.component.html',
  styleUrl: './header-top-strip.component.scss',
})
export class HeaderTopStripComponent {
  @Input() promotionTitle!: any;
  @Input() topCmsData!: any;
  @Input() stripFlagIcon: any = 'assets/images/flags/USA.png';
  @Input() shippingIcon: any = 'assets/icons/shipping.png';
  @Output() pageUrl = new EventEmitter<any>();

  ngOnInit() {
    // Set default promotion title if not provided
    if (!this.promotionTitle) {
      this.promotionTitle = 'Free shipping on orders over $50!';
    }
    
    // Set default CMS data if not provided
    if (!this.topCmsData || this.topCmsData.length === 0) {
      this.topCmsData = [
        { pageTitle: 'Help & FAQ', pageUrl: '/help' },
        { pageTitle: 'Contact Us', pageUrl: '/contact' },
        { pageTitle: 'Track Order', pageUrl: '/track-order' }
      ];
    }
  }

  onRedirectDetailsPage(url: string) {
    this.pageUrl.emit(url);
  }
}
