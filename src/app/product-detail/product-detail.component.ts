import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @Input() spotlightImg = 0;
  @Input() product: any;
  @Input() features: any;
  @Input() variantSampleKeys: any;
  @Input() variantTree: any;
  @Input() alsoBoughtProducts: any;
  @Input() accessoryProducts: any;
  @Input() crossSellProducts: any;
  @Input() upSellProducts: any;
  @Input() quantity = 1;

  @Input() selectedVariant: Partial<{
    key: string;
    skuName: string;
    skuId: string;
  }> = {};
  @Input() productImage!: string;
  @Input() downloadProdContents: Array<any> = [];
  @Input() additionalImages: any;
  @Input() userIsLoggedIn = false;
  @Input() reviewFormGroup!: FormGroup;
  @Input() bannersDetail: any[] = [];
  @Input() lastViewedProducts: any[] = [];
  @Input() variantPrice: any;
  @Input() quesList: any;

  @Input() configPrice = undefined;
  @Input() showAllSimilarItems: boolean = false;
  @Input() showAllAlsoBoughtItems: boolean = false;
  @Input() showAllAccessoryItems: boolean = false;
  @Input() showAllObsoleteItems: boolean = false;
  @Input() showAllRevisionItems: boolean = false;
  @Input() showAllSubstituteItems: boolean = false;
  @Input() paymentMethods: any[] = [];
  @Input() showLoading = false;
  @Input() bannerFive: any;

  @Input() substituteProducts: any;
  @Input() obsoleteProducts: any;
  @Input() revisionProducts: any;

  @Input() selectedFeatureOne: string = '';
  @Input() selectedFeatureTwo: string = '';

  @Input() breadcrumbLabel: string = '';
  @Input() breadcrumbURL: string = '';
  @Input() productDetailsInfo: SafeHtml = '';
  @Input() reviewText: string = '';
  @Input() avgRatingsFill: any;

  @Input() displayPrice: {
    price: number;
    oldPrice: number;
    hasDiscount: boolean;
    discountPercent: number;
  } | null = null;
  @Input() displayVariantPrice: {
    price: number;
    oldPrice: number;
    hasDiscount: boolean;
    discountPercent: number;
  } | null = null;

  @Output() changeImage = new EventEmitter<any>();
  @Output() addCart = new EventEmitter<any>();
  @Output() getProductSpecsPDF = new EventEmitter<any>();
  @Output() addReview = new EventEmitter<any>();
  @Output() selectVariant = new EventEmitter<any>();
  @Output() selectItemVariant = new EventEmitter<any>();
  @Output() onSelectProductDetails = new EventEmitter<any>();

  @Output() openReview = new EventEmitter<any>();
  @Output() imageSpotlightUp = new EventEmitter<any>();
  @Output() imageSpotlightDown = new EventEmitter<any>();
  @Output() onImageError = new EventEmitter<any>();

  @Output() onShowAllAccessoryItems = new EventEmitter<any>();
  @Output() onshowAllAlsoBoughtItems = new EventEmitter<any>();
  @Output() onShowAllObsoleteItems = new EventEmitter<any>();
  @Output() onShowAllSimilarItems = new EventEmitter<any>();
  @Output() onShowAllRevisionItems = new EventEmitter<any>();
  @Output() onShowAllSubstituteItems = new EventEmitter<any>();
  @Output() onUpdatedQuantity = new EventEmitter<any>();

  // TODO:: WIP ==== Above Inputs and Outputs Converted
  customerStarRating = 4;

  // productId!: string;
  // avgRating!: number;
  // totalReviews!: number;
  // isVariant!: boolean;
  // blob: any;

  // Configurable related changes
  // isVirtual: any;

  // featureList: any;
  // featureTypes: any;
  // featuresModelVal = [];
  // configurableProduct: any;

  // TODO: Need to test configurable product for One Template and update the below accordingly
  comment: any = [];
  commentCheckBox: any = [];
  confDropdowns = [];
  checkbox = [];

  data: any = {};

  constructor() {}

  ngOnInit() {
    console.log('========== Prepared Variants ==========', this.variantTree);
  }

  addToCart(qty: number, isBuyNow: boolean) {
    let cartData = {
      qty: qty,
      isBuyNow: isBuyNow,
    };
    this.addCart.emit(cartData);
  }

  selectVariantHandler(type: 'key', value: any) {
    let variantData = {
      type: type,
      value: value,
    };
    this.selectVariant.emit(variantData);
  }

  selectVariantItemHandler(data: any) {
    this.selectItemVariant.emit(data);
  }

  selectProductDetails(
    conf: any,
    index: any,
    isSingleChoice: any,
    checkboxIndex: any
  ): void {
    let prodDetails = {
      conf: conf,
      index: index,
      isSingleChoice: isSingleChoice,
      checkboxIndex: checkboxIndex,
    };
    this.onSelectProductDetails.emit(prodDetails);
  }

  openProductSpecificationsPDF(productId: string, contentId: string) {
    let productSpecsData = {
      productId: productId,
      contentId: contentId,
    };
    this.getProductSpecsPDF.emit(productSpecsData);
  }
  // new logics

  onChangeImage(imgId: number) {
    this.changeImage.emit(imgId);
  }
  toggleShowAccessory() {
    this.onShowAllAccessoryItems.emit();
  }
  toggleShowAlsoBought() {
    this.onshowAllAlsoBoughtItems.emit();
  }
  toggleShowSimilar() {
    this.onShowAllSimilarItems.emit();
  }

  toggleShowObsolete() {
    this.onShowAllObsoleteItems.emit();
  }

  toggleShowRevision() {
    this.onShowAllRevisionItems.emit();
  }

  toggleShowSubstitute() {
    this.onShowAllSubstituteItems.emit();
  }

  openReviewModal(content: string) {
    this.openReview.emit(content);
  }

  spotlightUP() {
    this.imageSpotlightUp.emit();
  }
  spotlightDown() {
    this.imageSpotlightDown.emit();
  }
  onChangeQuantity(value: number) {
    this.onUpdatedQuantity.emit(value);
  }
  onError(event: Event) {
    this.onImageError.emit(event);
  }
}
