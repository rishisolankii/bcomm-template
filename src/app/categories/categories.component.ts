import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  @Input() categoryId!: string;
  @Input() subCategories: any[] = [];
  // @Input() products: object[] = [];
  @Input() products: any[] = [];
  @Input() categoryBanner: any;
  @Input() categoryName: any;
  @Input() categoryDescription: any;
  @Input() swiperOptions: any;
  @Input() searchText: any;
  @Input() reachedMaximum = false;
  @Input() showLoading = false;
  @Input() featuredPorducts: any;

  @Output() getProducts = new EventEmitter<any>();
  @Output() getMoreProducts = new EventEmitter<any>();
  @Output() searchTextChanged = new EventEmitter<any>();

  // For Banner Section
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() description!: string;
  @Input() ctaType!: string;
  @Input() ctaLabel!: string;
  @Input() mediaURL!: string;
  @Input() bgColor!: string;
  @Input() bannerData!: any;
  @Input() searchPlaceHolder: any;
  @Output() goToBanner = new EventEmitter<any>();
  @Input() filters: any = {};
  @Input() selectedFilters: any = {};
  @Output() deselectRadioBtn$ = new EventEmitter<{}>();
  @Output() onApplyFilter$ = new EventEmitter<void>();
  @Output() clearFilter$ = new EventEmitter<void>();
  objectKeys = Object.keys;
  @Input() minPrice: any = new FormControl();
  @Input() maxPrice: any = new FormControl();
  @Input() sortingOptions: any = [];
  @Input() selectedSorting: any = 'SortKeywordRelevancy';
  @Output() selectSorting$ = new EventEmitter<any>();
  @Output() subCategoryProductId = new EventEmitter<any>();
  @Output() productId = new EventEmitter<any>();
  @Output() goToProduct = new EventEmitter<any>();
  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();
  @Output() changeFilter$ = new EventEmitter<any>();
  @Output() getLabel$ = new EventEmitter<any>();
  @Input() sortingLabel!: any;

  onRedirectToUrl(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
  goToBannerURL() {
    this.goToBanner.emit();
  }
  goToProductDetails(product: any) {
    this.goToProduct.emit(product);
  }
  fetchProducts(isSearch?: boolean) {
    this.getProducts.emit(isSearch);
  }
  fetchMoreProducts() {
    this.getMoreProducts.emit();
  }

  onChange(e: any) {
    this.searchTextChanged.emit(e);
    // this.searchTextChanged.emit(this.searchText);
  }

  deselectRadioBtn(filterKey: string, selectedValue: string) {
    this.deselectRadioBtn$.emit({
      filterKey,
      selectedValue,
    });
  }

  clearFilter() {
    this.clearFilter$.emit();
  }

  onApplyFilter() {
    this.onApplyFilter$.emit();
  }

  // onChangeFilter($event: any, productFeatureId: string) {
  //   const checked = ($event.target as HTMLInputElement).checked;
  //   if (checked) {
  //     this.selectedFilters[productFeatureId] = productFeatureId;
  //   } else {
  //     delete this.selectedFilters[productFeatureId];
  //   }
  // }

  // getLabel(value: any): any {
  //   const match = this.sortingOptions.find((opt: any) => opt.value === value);
  //   return match ? match.label : '';
  // }

  onChangeFilter($event: any, productFeatureId: string) {
    this.changeFilter$.emit({ $event, productFeatureId });
    // const checked = ($event.target as HTMLInputElement).checked;
    // if (checked) {
    //   this.selectedFilters[productFeatureId] = productFeatureId;
    // } else {
    //   delete this.selectedFilters[productFeatureId];
    // }
  }

  // getLabel(value: any): any {
  //   const match = this.sortingOptions.find((opt: any) => opt.value === value);
  //   return match ? match.label : "";
  // }
  // getLabel(value: any): any {
  //   this.getLabel$.emit(value);
  //   // const match = this.sortingOptions.find((opt: any) => opt.value === value);
  //   // return match ? match.label : "";
  // }

  selectSorting(value: string) {
    this.selectSorting$.emit(value);
  }
  onRedirectToProduct(id: string) {
    this.subCategoryProductId.emit(id);
  }
  redirectToDetails(id: any) {
    this.productId.emit(id);
  }
}
