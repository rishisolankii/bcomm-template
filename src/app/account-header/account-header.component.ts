import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.scss',
})
export class AccountHeaderComponent {
  @Input() profileUserData: any;
  @Input() emailDataList: any;

  ngOnInit() {
    // Set default profile data if not provided
    if (!this.profileUserData) {
      this.profileUserData = {
        firstName: 'John',
        middleName: '',
        lastName: 'Doe',
        profileImage: 'assets/images/dummy-user.png'
      };
    }

    // Set default email data if not provided
    if (!this.emailDataList || this.emailDataList.length === 0) {
      this.emailDataList = [
        { infoString: 'john.doe@example.com' }
      ];
    }
  }
}
