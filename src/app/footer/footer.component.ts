
import { Component, inject, Input } from '@angular/core';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  _mockService = inject(MockDataService);
  mockContactDetails = this._mockService.getMockStoreDetails();

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

  ngOnInit() {
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

    if (!this.companyName) {
      this.companyName = this.mockContactDetails.companyName;
    }

    if (!this.storeLogo) {
      this.storeLogo = this.mockContactDetails.logo;
    }

    // Set default categories if not provided
    if (!this.categories || this.categories.length === 0) {
      this.categories = [
        {
          catalogName: 'Electronics',
          productCategoryId: 'electronics',
          categoryList: [
            { productCategoryId: 'smartphones', categoryName: 'Smartphones' },
            { productCategoryId: 'laptops', categoryName: 'Laptops' },
            { productCategoryId: 'headphones', categoryName: 'Headphones' }
          ]
        },
        {
          catalogName: 'Fashion',
          productCategoryId: 'fashion',
          categoryList: [
            { productCategoryId: 'mens-clothing', categoryName: 'Men\'s Clothing' },
            { productCategoryId: 'womens-clothing', categoryName: 'Women\'s Clothing' },
            { productCategoryId: 'shoes', categoryName: 'Shoes' }
          ]
        }
      ];
    }

    // Set default footer CMS data if not provided
    if (!this.footerCmsData || this.footerCmsData.length === 0) {
      this.footerCmsData = [
        { pageTitle: 'About Us', pageUrl: '/about' },
        { pageTitle: 'Privacy Policy', pageUrl: '/privacy' },
        { pageTitle: 'Terms & Conditions', pageUrl: '/terms' },
        { pageTitle: 'Return Policy', pageUrl: '/returns' }
      ];
    }
  }
}
