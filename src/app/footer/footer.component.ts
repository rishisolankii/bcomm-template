import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() storeLogo: any;
  @Input() categories: any = [];
  @Input() companyName: any;
  @Input() companyAddress: any;
  @Input() companyEmail: any;
  @Input() companyContact: any;
  @Input() newsletterData: any;
  @Input() bottomCmsData: any;
  @Input() footerCmsData: any;
  @Input() iframeHtml: any;
}
