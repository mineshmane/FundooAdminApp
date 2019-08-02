import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin/admin-service.service'
declare var $: any;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  orderList: any;

  constructor(private adminService: AdminServiceService) { }

  ngOnInit() {
    this.getAllPlacedOrders()
  }

  getAllPlacedOrders() {
    $.ajax({
      url: "http://34.213.106.173/api/productcarts/userCartList",
      type: "get",
      dataType: "json",
      headers: {
        'Authorization': localStorage.getItem('admintoken')
      },
      contentType: 'application/json; charset=utf-8',
      success: (data: any) => {
        console.log('data is', data);
        this.orderList = data['data'];
        this.orderList.reverse();
      },
      error: (textStatus, ) => {
        console.log('error data ', textStatus);
      },

    });

  }

  acceptOrder(data1) {
    console.log(" data in accpet", data1.id);
    let data = {
      cartId: data1.id
    }
    $.ajax({
      url: "http://34.213.106.173/api/productcarts/adminCompleteOrder/",
      type: "post",
      dataType: "json",
      headers: {
        'Authorization': localStorage.getItem('admintoken')
      },
      data: JSON.stringify({
        cartId: data1.id
      }),
      contentType: 'application/json; charset=utf-8',
      success: (data: any) => {
        console.log('data is', data);
        this.getAllPlacedOrders();


      },
      error: (textStatus) => {
        console.log('error data ', textStatus);
      },


    });
    // this.adminService.completeOrder(data).subscribe(response => {
    //   console.log(response);
    //   this.getAllPlacedOrders();

    // }, error => {
    //   console.log("  error to accpet order", error);

    // })

  }



  rejectOrder(order){
    $.ajax({
      url: "http://34.213.106.173/api/productcarts/adminCancelOrder/",
      type: "post",
      dataType: "json",
      headers: {
        'Authorization': localStorage.getItem('admintoken')
      },
      data: JSON.stringify({
        cartId: order.id
      }),
      contentType: 'application/json; charset=utf-8',
      success: (data: any) => {
        console.log('data is', data);
        this.getAllPlacedOrders();


      },
      error: (textStatus) => {
        console.log('error data ', textStatus);
      },


    });
  }


}
