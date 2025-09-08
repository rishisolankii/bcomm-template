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

  ngOnInit() {
    // Set default breadcrumb if not provided
    if (!this.inactiveElements || this.inactiveElements.length === 0) {
      this.inactiveElements = [{ label: 'Home', redirectUrl: '' }];
    }
    if (!this.activeElement) {
      this.activeElement = 'Current Page';
    }
  }

  onRedirect(url: string) {
    const URL = '/' + url;
    this.redirectUrl.emit(URL);
  }
}
