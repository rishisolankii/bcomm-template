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
  goToBannerURL(banner?: any) {
    console.log(banner);

    this.bannerUrl.emit(banner || true);
  }
}
