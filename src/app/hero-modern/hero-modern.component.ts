import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero-modern',
  templateUrl: './hero-modern.component.html',
  styleUrl: './hero-modern.component.scss',
})
export class HeroModernComponent {
  @Input() banner!: any;
  @Input() foundBanner!: any;
  @Input() bannerKey: string = 'banner1';
  @Output() bannerUrl = new EventEmitter<any>();

  ngOnInit() {
    // Set default banner if not provided
    if (!this.banner) {
      this.banner = {
        type: 'modern-banner',
        urls: ['assets/images/hero-modern-default.jpg'],
        title: 'Modern Shopping Experience',
        description: 'Discover the future of online shopping with our curated collection',
        imageTitle: 'Explore Collection',
        imageDescription: 'Premium quality, modern design',
        urlType: 'category',
        url: '/categories/modern'
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
