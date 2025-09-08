import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrl: './cms-page.component.scss',
})
export class CmsPageComponent {
  @Input() cmsDetails: any;
  @Output() redirectBreadcrumbUrl = new EventEmitter<any>();

  ngOnInit() {
    // Set default CMS content if not provided
    if (!this.cmsDetails) {
      this.cmsDetails = {
        pageTitle: 'Sample CMS Page',
        pageContent: `
          <h1>Welcome to Our Store</h1>
          <p>This is a sample CMS page demonstrating how content appears on your website. You can customize this content through your admin panel.</p>
          <h2>About Us</h2>
          <p>We are committed to providing high-quality products and excellent customer service. Our team works hard to ensure your shopping experience is seamless and enjoyable.</p>
          <h2>Our Mission</h2>
          <p>To deliver exceptional value and service to our customers while maintaining the highest standards of quality and integrity.</p>
        `,
        breadcrumb: [
          { label: 'Home', redirectUrl: '' },
          { label: 'About', redirectUrl: 'about' }
        ],
        lastUpdated: new Date().toLocaleDateString()
      };
    }
  }

  onRedirectToUrl(url: any) {
    this.redirectBreadcrumbUrl.emit(url);
  }
}
