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

  ngOnInit() {
    // Set default company info if not provided
    if (!this.companyName) {
      this.companyName = 'Demo Store';
    }
    
    if (!this.companyEmail) {
      this.companyEmail = 'info@demostore.com';
    }
    
    if (!this.companyContact) {
      this.companyContact = '+1 (555) 123-4567';
    }
    
    if (!this.companyAddress) {
      this.companyAddress = '123 Commerce Street, Business District, NY 10001';
    }

    if (!this.storeLogo) {
      this.storeLogo = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&crop=center';
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
