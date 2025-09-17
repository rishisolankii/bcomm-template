import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent {
  @Input() banner!: any;
  @Input() foundBanner!: any;
  @Input() bannerKey: string = 'banner1';
  @Output() bannerUrl = new EventEmitter<any>();

  ngOnInit() {
    // Set default banner if not provided
    if (!this.banner) {
      this.banner = {
        type: 'banner',
        urls: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop&crop=center'],
        title: 'Welcome to Our Store',
        description: 'Discover amazing products with great deals and fast shipping',
        imageTitle: 'Shop Now',
        imageDescription: 'Quality products at unbeatable prices',
        urlType: 'category',
        url: '/categories/featured'
      };
    }

    if (!this.foundBanner) {
      this.foundBanner = this.banner;
    }
  }

  goToBannerURL(banner?: any) {
    console.log(banner);
    this.bannerUrl.emit(banner || true);
  }
}
