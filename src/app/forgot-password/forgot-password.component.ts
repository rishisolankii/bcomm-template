import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  @Input() resetFG!: FormGroup;
  @Input() storeLogo: any;

  @Output() sendEmail = new EventEmitter<any>();
  @Output() redirectToHome = new EventEmitter<any>();
  @Output() redirectToLogin = new EventEmitter<any>();
  onSendEmail() {
    this.sendEmail.emit();
  }
  onRedirectToHome() {
    this.redirectToHome.emit(true);
  }
  onRedirectToLogin() {
    this.redirectToLogin.emit(true);
  }
}
