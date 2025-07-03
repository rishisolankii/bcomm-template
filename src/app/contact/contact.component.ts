import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input() isLoading = true;
  @Input() companyAddress!: any;
  @Input() companyContact!: any;
  @Input() companyEmail!: any;
  @Input() contactFormData!: FormGroup;
  @Input() iframeHtml!: any;
  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();

  onRedirect(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
}
