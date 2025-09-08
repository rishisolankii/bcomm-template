import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderCategoriesComponent } from './header-categories/header-categories.component';
import { FooterCopyrightStripComponent } from './footer-copyright-strip/footer-copyright-strip.component';
import { HeaderTopStripComponent } from './header-top-strip/header-top-strip.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { OfferBannerComponent } from './offer-banner/offer-banner.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { HeroFullComponent } from './hero-full/hero-full.component';
import { HomeComponent } from './home/home.component';
import { HeroModernComponent } from './hero-modern/hero-modern.component';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { BannerItemComponent } from './banner-item/banner-item.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RemoteAssetPipe } from './utils/remote-asset.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
    FooterCopyrightStripComponent,
    HeaderTopStripComponent,
    ItemCardComponent,
    OfferBannerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EmptyCartComponent,
    ContactComponent,
    CartComponent,
    BreadcrumbComponent,
    AccountHeaderComponent,
    AccountSidebarComponent,
    AllOrdersComponent,
    FaqsComponent,
    HeroBannerComponent,
    HeroFullComponent,
    HomeComponent,
    HeroModernComponent,
    CmsPageComponent,
    BannerItemComponent,
    CategoriesComponent,
    ProductDetailComponent,
    RemoteAssetPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
    FooterCopyrightStripComponent,
    HeaderTopStripComponent,
    ItemCardComponent,
    OfferBannerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EmptyCartComponent,
    ContactComponent,
    CartComponent,
    BreadcrumbComponent,
    AccountHeaderComponent,
    AccountSidebarComponent,
    AllOrdersComponent,
    FaqsComponent,
    HeroBannerComponent,
    HeroFullComponent,
    HomeComponent,
    HeroModernComponent,
    CmsPageComponent,
    BannerItemComponent,
    CategoriesComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class ComponentModule {}
export {
  HeaderComponent,
  FooterComponent,
  HeaderCategoriesComponent,
  FooterCopyrightStripComponent,
  HeaderTopStripComponent,
  ItemCardComponent,
  OfferBannerComponent,
  LoginComponent,
  RegisterComponent,
  ForgotPasswordComponent,
  EmptyCartComponent,
  ContactComponent,
  CartComponent,
  BreadcrumbComponent,
  AccountHeaderComponent,
  AccountSidebarComponent,
  AllOrdersComponent,
  FaqsComponent,
  HeroBannerComponent,
  HeroFullComponent,
  HomeComponent,
  HeroModernComponent,
  CmsPageComponent,
  BannerItemComponent,
  CategoriesComponent,
  ProductDetailComponent,
};
