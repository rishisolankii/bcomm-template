import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrl: './cms-page.component.scss',
})
export class CmsPageComponent {
  @Input() cmsDetails: any;
  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();
  onRedirectToUrl(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
}
