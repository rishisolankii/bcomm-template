// ==== DO NOT CHANGE THIS FILE:: FOR PREVIEW PURPOSE ONLY ====
// ==== This wont impact the live store, so ignore this file ====
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ComponentModule } from './component.module';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lasio-template';
  showHeader = false;
  showTopHeaderStrip = false;
  showHeaderCategories = false;
  showCopyrightStrip = false;
  showFooter = false;

  private hideAllRoutes: string[] = [
    '/auth/register',
    '/auth/login',
    '/auth/forgot-password',
    '/manage-store/bonanza-connect',
  ];

  private partialHideRoutes: string[] = [
    '/account/profile',
    '/account/password',
    '/order/history',
    '/account/payment-methods',
    '/manage-store/settings/theme',
    '/manage-store/settings/banners',
    '/manage-store/settings/cms',
    '/manage-store/settings/other',
    '/manage-store/settings/cms/details',
    '/manage-store/settings/access',
  ];

  constructor(private _router: Router) {
    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }) => {
        if (
          this.hideAllRoutes.includes(urlAfterRedirects) ||
          urlAfterRedirects.includes('/auth')
        ) {
          // Hide everything
          this.setLayout(false, false, false, false, false);
        } else if (this.partialHideRoutes.includes(urlAfterRedirects)) {
          // Hide categories only
          this.setLayout(true, true, false, true, true);
        } else {
          // Show everything
          this.setLayout(true, true, true, true, true);
        }
      });
  }

  private setLayout(
    header: boolean,
    topHeader: boolean,
    categories: boolean,
    copyright: boolean,
    footer: boolean
  ) {
    this.showHeader = header;
    this.showTopHeaderStrip = topHeader;
    this.showHeaderCategories = categories;
    this.showCopyrightStrip = copyright;
    this.showFooter = footer;
  }
}
