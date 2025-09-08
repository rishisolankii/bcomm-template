import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input() isLoading = false; // Changed default to false for demo
  @Input() companyAddress!: any;
  @Input() companyContact!: any;
  @Input() companyEmail!: any;
  @Input() contactFormData!: FormGroup;
  @Input() iframeHtml!: any;
  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Set default contact form if not provided
    if (!this.contactFormData) {
      this.contactFormData = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        message: ['', Validators.required]
      });
    }

    // Set default company information if not provided
    if (!this.companyAddress) {
      this.companyAddress = '123 Commerce Street, Business District, NY 10001';
    }

    if (!this.companyContact) {
      this.companyContact = '+1 (555) 123-4567';
    }

    if (!this.companyEmail) {
      this.companyEmail = 'info@demostore.com';
    }
  }

  onRedirect(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
}
