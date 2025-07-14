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
  onRedirectDetailsPage(url: string) {
    this.pageUrl.emit(url);
  }
}
