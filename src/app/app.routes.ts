import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
];
