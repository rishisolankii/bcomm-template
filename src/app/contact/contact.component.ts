import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  _mockService = inject(MockDataService);
  mockContactDetails = this._mockService.getMockStoreDetails();

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

    // Set Mock Data for Dev Preview
    if (!this.companyAddress) {
      this.companyAddress = this.mockContactDetails.companyAddress;
    }

    if (!this.companyContact) {
      this.companyContact = this.mockContactDetails.companyContact;
    }
    
    if (!this.companyEmail) {
      this.companyEmail = this.mockContactDetails.companyEmail;
    }
  }

  onRedirect(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
}
