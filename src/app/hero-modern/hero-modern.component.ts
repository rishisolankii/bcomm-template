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
  @Output() bannerUrl: EventEmitter<any> = new EventEmitter<any>();
  goToBannerURL(banner?: any) {
    console.log(banner);

    this.bannerUrl.emit(banner || true);
  }
}
