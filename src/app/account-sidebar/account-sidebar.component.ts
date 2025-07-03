import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.scss',
})
export class AccountSidebarComponent {
  @Input() sidebarOptions!: any[];
  @Output() onRedirectURL = new EventEmitter<any>();
  activeUrl!: string;
  onRedirection(url: string) {
    this.onRedirectURL.emit(url);
  }
}
