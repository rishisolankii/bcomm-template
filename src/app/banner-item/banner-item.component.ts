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
  goToBannerURL(banner: any) {
    this.goToBanner.emit(banner);
  }
}
