import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent {
  @Input() faqs: any;
  @Output() onRedirectUrl = new EventEmitter<any>();

  ngOnInit() {
    // Set default FAQs if not provided
    if (!this.faqs || this.faqs.length === 0) {
      this.faqs = [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please contact our customer service team to initiate a return.',
          isExpanded: false
        },
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days. Free shipping is available on orders over $50.',
          isExpanded: false
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping times vary by location and typically take 7-14 business days. Additional customs fees may apply.',
          isExpanded: false
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.',
          isExpanded: false
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system.',
          isExpanded: false
        },
        {
          question: 'How do I contact customer service?',
          answer: 'You can reach our customer service team via email at support@demostore.com, phone at (555) 123-4567, or through our live chat feature available 24/7.',
          isExpanded: false
        }
      ];
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].isExpanded = !this.faqs[index].isExpanded;
  }

  onRedirection(url: string) {
    this.onRedirectUrl.emit(url);
  }
}
