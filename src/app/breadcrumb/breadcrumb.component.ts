import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() inactiveElements: any;
  @Input() activeElement = '';
  @Output() redirectUrl = new EventEmitter<any>();

  onRedirect(url: string) {
    const URL = '/' + url;
    this.redirectUrl.emit(URL);
  }
}
