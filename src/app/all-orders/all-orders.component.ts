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
  @Output() openReturnDetailsModal = new EventEmitter<any>();

  ngOnInit() {
    // Set default orders list if not provided
    if (!this.ordersList || this.ordersList.length === 0) {
      this.ordersList = [
        {
          orderId: 'ORD-2024-001',
          orderDate: '2024-01-15',
          totalAmount: 299.99,
          status: 'Delivered',
          statusClass: 'delivered',
          items: [
            { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
            { name: 'Phone Case', quantity: 2, price: 50.00 }
          ],
          shippingAddress: '123 Main St, Anytown, ST 12345',
          trackingNumber: 'TRK123456789'
        },
        {
          orderId: 'ORD-2024-002',
          orderDate: '2024-01-20',
          totalAmount: 149.99,
          status: 'Shipped',
          statusClass: 'shipped',
          items: [
            { name: 'Bluetooth Speaker', quantity: 1, price: 149.99 }
          ],
          shippingAddress: '123 Main St, Anytown, ST 12345',
          trackingNumber: 'TRK987654321'
        },
        {
          orderId: 'ORD-2024-003',
          orderDate: '2024-01-25',
          totalAmount: 79.99,
          status: 'Processing',
          statusClass: 'processing',
          items: [
            { name: 'Smartphone Cable', quantity: 3, price: 79.99 }
          ],
          shippingAddress: '123 Main St, Anytown, ST 12345',
          trackingNumber: null
        }
      ];
    }
  }

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
