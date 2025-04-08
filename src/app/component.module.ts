import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderCategoriesComponent } from './header-categories/header-categories.component';
import { FooterCopyrightStripComponent } from './footer-copyright-strip/footer-copyright-strip.component';
import { HeaderTopStripComponent } from './header-top-strip/header-top-strip.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { OfferBannerComponent } from './offer-banner/offer-banner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
    FooterCopyrightStripComponent,
    HeaderTopStripComponent,
    ItemCardComponent,
    OfferBannerComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
    FooterCopyrightStripComponent,
    HeaderTopStripComponent,
    ItemCardComponent,
    OfferBannerComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, NgbModule],
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
};
