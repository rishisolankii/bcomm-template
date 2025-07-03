import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent {
  @Input() ordersList: any;
  @Output() openOrderDetails = new EventEmitter<any>();
  @Output() downloadPDF = new EventEmitter<any>();
  @Output() openReturnOrderModal = new EventEmitter<any>();
  @Output() openReturnDetailsModal: EventEmitter<any> = new EventEmitter<any>();

  onOpenOrderDetails(orderId: any) {
    this.openOrderDetails.emit(orderId);
  }

  onDownloadPDF(orderId: any) {
    this.downloadPDF.emit(orderId);
  }

  onOpenReturnOrderModal(orderId: any) {
    this.openReturnOrderModal.emit(orderId);
  }

  onOpenReturnDetailsModal(returnItems: any) {
    this.openReturnDetailsModal.emit(returnItems);
  }
}
