import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-copyright-strip',
  templateUrl: './footer-copyright-strip.component.html',
  styleUrl: './footer-copyright-strip.component.scss',
})
export class FooterCopyrightStripComponent {
  @Input() companyName: string = '';
  currentYear = new Date().getFullYear();

  ngOnInit() {
    // Set default company name if not provided
    if (!this.companyName) {
      this.companyName = 'Demo Store';
    }
  }
}
