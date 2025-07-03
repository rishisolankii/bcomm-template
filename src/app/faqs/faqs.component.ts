import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent {
  @Input() faqs: any;
  @Output() onRedirectUrl = new EventEmitter<any>();

  onRedirection(url: string) {
    this.onRedirectUrl.emit(url);
  }
}
