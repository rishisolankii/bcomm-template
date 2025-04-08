import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrl: './header-categories.component.scss',
})
export class HeaderCategoriesComponent {
  @Input() showOverlay: any;
  @Input() selectedCategoryId!: any;
  @Input() categories: any;
  @Input() menuCmsData: any;
  @Input() defaultProductImage: any;
  @Output() categoryOverlayId: EventEmitter<any> = new EventEmitter<any>();
  @Output() subcategoryId: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageUrl: EventEmitter<any> = new EventEmitter<any>();

  // showOverlay = false;
  // selectedCategoryId!: number;
  // categories: CatalogColTypes[] = [];
  // menuCmsData!: any;

  openCategoryOverlay(id: any) {
    this.categoryOverlayId.emit(id);
  }

  redirectBySubcategory(id: any) {
    this.subcategoryId.emit(id);
  }

  redirectByPageUrl(url: any) {
    this.pageUrl.emit(url);
  }
}
