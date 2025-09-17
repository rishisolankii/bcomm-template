import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Set default reset form if not provided
    if (!this.resetFG) {
      this.resetFG = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      });
    }

    // Set default store logo if not provided
    if (!this.storeLogo) {
      this.storeLogo = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&crop=center';
    }
  }

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
