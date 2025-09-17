import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-banner-item",
  templateUrl: "./banner-item.component.html",
  styleUrl: "./banner-item.component.scss",
})
export class BannerItemComponent {
  @Input() banner: any;
  @Input() bannerDescription: Boolean = false;

  @Output() goToBanner = new EventEmitter<any>();

  ngOnInit() {
    // Set default banner if not provided
    if (!this.banner) {
      this.banner = {
        type: 'item-banner',
        urls: ['https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=300&fit=crop&crop=center'],
        title: 'Special Offer',
        description: 'Limited time deal on selected items',
        imageTitle: 'Shop Deal',
        imageDescription: 'Save up to 30% off',
        urlType: 'category',
        url: '/categories/deals'
      };
    }
  }

  goToBannerURL(banner: any) {
    this.goToBanner.emit(banner);
  }
}
