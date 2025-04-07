import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-top-strip',
  templateUrl: './header-top-strip.component.html',
  styleUrl: './header-top-strip.component.scss',
})
export class HeaderTopStripComponent {
  @Input() promotionTitle!: any;
  @Input() topCmsData!: any;
  @Input() stripFlagIcon!: any;
  @Input() shippingIcon!: any;
  @Output() pageUrl: EventEmitter<any> = new EventEmitter<any>();
  onRedirectDetailsPage(url: string) {
    this.pageUrl.emit(url);
  }
}
