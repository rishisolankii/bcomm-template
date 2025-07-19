import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.scss',
})
export class AccountHeaderComponent {
  @Input() profileUserData: any;
  // @Input() emailDataList: any;
}
