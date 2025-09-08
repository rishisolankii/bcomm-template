import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Input() registerFG!: FormGroup;
  @Input() storeLogo: any;

  @Output() redirectToLogin = new EventEmitter<any>();
  @Output() redirectToHome = new EventEmitter<any>();
  @Output() register = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Set default register form if not provided
    if (!this.registerFG) {
      this.registerFG = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        agreeToTerms: [false, Validators.requiredTrue]
      });
    }

    // Set default store logo if not provided
    if (!this.storeLogo) {
      this.storeLogo = 'assets/images/logo.png';
    }
  }

  onRegister() {
    this.register.emit(true);
  }
  onRedirectToHome() {
    this.redirectToHome.emit(true);
  }
  onRedirectToLogin() {
    this.redirectToLogin.emit(true);
  }
}
