import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

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

  @Output() bannerUrl: EventEmitter<any> = new EventEmitter<any>();
  @Output() goToBanner = new EventEmitter<any>();
  @Output() categoryRedirection = new EventEmitter<any>();
  @Output() productRedirection = new EventEmitter<any>();

  ngOnInit() {
    console.log(
      'bannersDetail-',
      this.bannersDetail,
      'mostPopularCategory-',
      this.mostPopularCategory,
      'popularCategories',
      this.popularCategories,
      'topPicks',
      this.topPicks,
      'bestsellers',
      this.bestsellers,
      'storeTheme',
      this.storeTheme,
      this.bannerFive
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
