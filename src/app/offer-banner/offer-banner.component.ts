import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-offer-banner',
  templateUrl: './offer-banner.component.html',
  styleUrl: './offer-banner.component.scss'
})
export class OfferBannerComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() description!: string;
  @Input() ctaType!: string;
  @Input() ctaLabel!: string;
  @Input() mediaURL!: string;
  @Input() bgColor!: string;
  @Input() bannerData!: any;
  @Output() goToBanner = new EventEmitter<any>();

  goToBannerURL() {
    this.goToBanner.emit(true);
  }
}
