import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin/admin-service.service'
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  orderList: Object;

  constructor(private adminService: AdminServiceService) { }

  ngOnInit() {
    this.getAllPlacedOrders()
  }

  getAllPlacedOrders() {
    this.adminService.getAllPlacedOrder().subscribe(response => {
      console.log("response in admin list", response);

      this.orderList = response['data'];
      console.log(" order list array ", this.orderList);



    }, error => {
      console.log(error);

    })
  }

  acceptOrder(data1) {
    console.log(" data in accpet", data1.id);
    let data={
      cartId:data1.id
    }
    this.adminService.completeOrder(data).subscribe(response => {
      console.log(response);
      this.getAllPlacedOrders();

    }, error => {
      console.log("  error to accpet order", error);

    })

  }


}
