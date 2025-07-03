import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
