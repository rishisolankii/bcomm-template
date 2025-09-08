import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-banner',
  templateUrl: './offer-banner.component.html',
  styleUrl: './offer-banner.component.scss',
})
export class OfferBannerComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() description!: string;
  @Input() ctaType!: string;
  @Input() ctaLabel!: string;
  @Input() mediaURL!: string;
  @Input() bgColor!: string;
  @Input() bannerData!: any;
  @Input() mediaType!: string;
  @Output() goToBanner = new EventEmitter<any>();

  ngOnInit() {
    // Set default values if not provided via Input
    if (!this.title) {
      this.title = 'Special Offer';
    }
    if (!this.subtitle) {
      this.subtitle = 'Limited Time Deal';
    }
    if (!this.description) {
      this.description = 'Don\'t miss out on our amazing deals and discounts. Shop now and save big on your favorite products!';
    }
    if (!this.ctaLabel) {
      this.ctaLabel = 'Shop Now';
    }
    if (!this.ctaType) {
      this.ctaType = 'button';
    }
    if (!this.mediaURL) {
      this.mediaURL = 'assets/images/offer-banner.jpg';
    }
    if (!this.bgColor) {
      this.bgColor = '#ff6b6b';
    }
    if (!this.mediaType) {
      this.mediaType = 'image';
    }
  }

  goToBannerURL() {
    this.goToBanner.emit(true);
  }
}
