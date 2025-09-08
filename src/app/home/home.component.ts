import { Component, EventEmitter, Input, Output } from '@angular/core';
import { remoteAsset } from '../utils/remote-asset';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() heroBannerType: any;
  @Input() bannersDetail: any;
  @Input() foundBanner!: any;
  @Input() storeTheme: any;
  @Input() mostPopularCategory: any;
  @Input() promotionCategory: any;
  @Input() popularCategories: any;
  @Input() topPicks: any;
  @Input() bestsellers: any;
  @Input() showLoading: any;
  @Input() mediaBaseUrl: any;
  @Input() promotionList: any;
  @Input() bannerOne: any;
  @Input() bannerTwo: any;
  @Input() bannerThree: any;
  @Input() bannerFour: any;
  @Input() bannerFive: any;
  @Input() bannerSix: any;

  @Output() bannerUrl = new EventEmitter<any>();
  @Output() goToBanner = new EventEmitter<any>();
  @Output() categoryRedirection = new EventEmitter<any>();
  @Output() productRedirection = new EventEmitter<any>();
  @Input() themeComponent: 'autoparts' | 'full' | 'modern' | null = null;

  brands = [
    {
      title: 'Brand 01',
      logo: remoteAsset('images/brands/01.png')
    },
    {
      title: 'Brand 02',
      logo: remoteAsset('images/brands/02.png')
    },
    {
      title: 'Brand 03',
      logo: remoteAsset('images/brands/03.png')
    },
    {
      title: 'Brand 04',
      logo: remoteAsset('images/brands/04.png')
    },
    {
      title: 'Brand 05',
      logo: remoteAsset('images/brands/05.png')
    },
    {
      title: 'Brand 06',
      logo: remoteAsset('images/brands/06.png')
    },
  ]

  // Usage Example for Static Assets
  staticBanner = remoteAsset('images/temp_full-banner.jpeg');

  ngOnInit() {
    console.log(
      'bannersDetail-',
      this.bannersDetail,
      'themeComponent-',
      this.themeComponent
    );
  }

  goToBannerURL(banner: any) {
    this.goToBanner.emit(banner);
  }

  goToURL(item?: any) {
    this.bannerUrl.emit(item);
  }
  goToCategory(id: string) {
    this.categoryRedirection.emit(id);
  }
  goToProduct(id: any) {
    this.productRedirection.emit(id);
  }
}
