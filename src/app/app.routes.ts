import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderCategoriesComponent } from './header-categories/header-categories.component';
import { FooterCopyrightStripComponent } from './footer-copyright-strip/footer-copyright-strip.component';
import { HeaderTopStripComponent } from './component.module';

export const routes: Routes = [
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
];
