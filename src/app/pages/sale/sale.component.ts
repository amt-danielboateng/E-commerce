import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

cartProducts: any[] = [];
subTotal:number = 0;
saleObj:any = {
  "SaleId": 0,
  "CustId": 1,
  "SaleDate": new Date(),
  "TotalInvoiceAmount": 0,
  "Discount": 0,
  "PaymentNaration": "Patreon",
  "DeliveryAddress1": "Plt 56 Blk 37",
  "DeliveryAddress2": "Near Airport Ridge",
  "DeliveryCity": "Takoradi",
  "DeliveryPinCode": "564832",
  "DeliveryLandMark": "TTU"
}

constructor(private productService: ProductService){

}

ngOnInit(): void {
  this.loadCart();
}

loadCart(){
  this.subTotal = 0;
  this.productService.getCartItemsByCustId(1).subscribe((res:any) =>{
    this.cartProducts = res.data;
    this.cartProducts.forEach(element =>{
      this.subTotal = this.subTotal + element.productPrice;
    })
  })
}


removeItem(id:number){
  this.productService.removeCartItemsById(id).subscribe((res: any) => {
    if (res.result) {
      this.loadCart();
      this.productService.cartAddedSubject.next(true);
    }
  })
}

makeSale(){
  this.saleObj.TotalInvoiceAmount = this.subTotal;
  this.productService.makeSale(this.saleObj).subscribe((res: any) => {
    if (res.result) {
      alert('Sales successfuly made');
      this.loadCart();
      this.productService.cartAddedSubject.next(true);
    }
  })
}

}
