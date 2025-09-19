import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { templateSettings } from '../utils/configs';

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
  @Output() quickLoginDismissed = new EventEmitter<any>();

  // Toggle this flat in the utils/configs.ts to swith betwene Quick login model, or full page login mode
  quickLoginEnabled: boolean = templateSettings.quickLoginEnabled ?? false;
  isLoginLoaded = false;

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
      this.storeLogo = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&crop=center';
    }
  }

  ngAfterViewInit() {
    // Wait for remote to bootstrap
    setTimeout(() => this.isLoginLoaded = true);
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
  
  onDismissQuickLogin() {
    this.quickLoginDismissed.emit(true);
  }
}
