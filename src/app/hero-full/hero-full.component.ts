import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero-full',
  templateUrl: './hero-full.component.html',
  styleUrl: './hero-full.component.scss',
})
export class HeroFullComponent {
  @Input() banner!: any;
  @Input() foundBanner!: any;
  @Input() bannerKey: string = 'banner1';
  @Output() bannerUrl = new EventEmitter<any>();
  goToBannerURL(banner?: any) {
    console.log(banner);

    this.bannerUrl.emit(banner || true);
  }
}
