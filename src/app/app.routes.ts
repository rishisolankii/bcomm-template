import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderCategoriesComponent } from './header-categories/header-categories.component';
import { FooterCopyrightStripComponent } from './footer-copyright-strip/footer-copyright-strip.component';
import {
  AllOrdersComponent,
  BreadcrumbComponent,
  CmsPageComponent,
  FaqsComponent,
  HeaderTopStripComponent,
  HomeComponent,
  OfferBannerComponent,
  DevPreviewComponent,
} from './component.module';
import { ItemCardComponent } from './item-card/item-card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { HeroFullComponent } from './hero-full/hero-full.component';
import { HeroModernComponent } from './hero-modern/hero-modern.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DevPreviewComponent,
  },
  {
    path: 'dev-preview',
    component: DevPreviewComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'header-categories',
    component: HeaderCategoriesComponent,
  },
  {
    path: 'footer-copyright-strip',
    component: FooterCopyrightStripComponent,
  },
  {
    path: 'header-top-strip',
    component: HeaderTopStripComponent,
  },
  {
    path: 'item-card',
    component: ItemCardComponent,
  },
  {
    path: 'offer-banner',
    component: OfferBannerComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'breadcrumb',
    component: BreadcrumbComponent,
  },
  {
    path: 'account-header',
    component: AccountHeaderComponent,
  },
  {
    path: 'account-sidebar',
    component: AccountSidebarComponent,
  },
  {
    path: 'all-orders',
    component: AllOrdersComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'hero-banner',
    component: HeroBannerComponent,
  },
  {
    path: 'hero-full',
    component: HeroFullComponent,
  },
  {
    path: 'hero-modern',
    component: HeroModernComponent,
  },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
  {
    path: 'cms',
    component: CmsPageComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
  },
];
