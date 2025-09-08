import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() loginFormGroup!: FormGroup;
  @Input() storeLogo: any;
  @Output() login = new EventEmitter<any>();
  @Output() redirectToRegister = new EventEmitter<any>();
  @Output() redirectToHome = new EventEmitter<any>();
  @Output() onForgotPassword = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Set default login form if not provided
    if (!this.loginFormGroup) {
      this.loginFormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    // Set default store logo if not provided
    if (!this.storeLogo) {
      this.storeLogo = 'assets/images/logo.png';
    }
  }

  onLogin() {
    this.login.emit(true);
  }
  onRedirectToHome() {
    this.redirectToHome.emit(true);
  }
  onForgot() {
    this.onForgotPassword.emit(true);
  }
  onRedirectToRegister() {
    this.redirectToRegister.emit(true);
  }
}
