import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpService/http.service';
import { Router } from '@angular/router'
import { AdminServiceService } from '../../services/admin/admin-service.service'
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {



  basic = 0; advance = 0; preBasic = 0; preAdvance = 0; char = '';
  array = []; mainArray = []; pre = '';
  count = this.array.length

  constructor(private httpService: HttpService, private router: Router, private dataService: AdminServiceService) {


    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.count
    };
  }
  public ngOnInit() {
    this.getUserList();

    // $(document).ready(function () {
    //   $('#dtBasicExample').DataTable();
    //   $('.dataTables_length').addClass('bs-select');
    //   });

    // $(document).ready(function () {
    //   $("#hide").click(function () {
    //     $(".advance").fadeToggle("fast");
    //     $(".basic").fadeToggle("fast");

    //   });
    // });

    // this.dataService.currentMessage.subscribe(message => {
    //   console.log("data in on change", message);
    //   if(message.type=='search'){
    //     this.values = message.data
    //   //  this.card = this.findCard(this.allnotes, this.value)
    //    // console.log("searched cards", this.card);

    //   }


    // })
  }
  values: any = '';
  // values=this.value;
  config: any;
  pageChanged(event) {
    this.config.currentPage = event;
  }

  //when user hit in search button it works
  onKeyUp(event: any) {
    //storing value in previous
    this.pre = this.values;
    this.values = event.target.value;
    if (this.values.length < this.pre.length) {//when user hit back space
      this.array = this.mainArray;
    }
    //method for name filtering
    var checkName = (item: any) => {
      // console.log('item ',item.firstName.toLowerCase(),'  value ',this.values.toLowerCase())
      return item.firstName.toLowerCase().startsWith(this.values.toLowerCase());
    }
    //array filter
    this.array = this.array.filter(function (item) {
      // console.log('item',item);
      return checkName(item);
    });
    console.log(this.array);

    for (var i = 0; i < this.array.length; i++) {
      this.char = this.array[i].service;
      if (this.char == 'basic' || this.char == 'Basic' || this.char == 'BASIC') {
        this.preBasic++;
      } else {
        this.preAdvance++;
      }
    }
    this.basic = this.preBasic, this.advance = this.preAdvance;
    this.preBasic = 0, this.preAdvance = 0;

  };

  getUserList() {
    try {


      this.httpService.getRequest('user/getAdminUserList').subscribe(data => {
        this.mainArray = data['data']['data'];
        this.array = this.mainArray;
        console.log(this.array);
        for (var i = 0; i < this.array.length; i++) {
          this.char = this.array[i].service;
          if (this.char == 'basic' || this.char == 'Basic' || this.char == 'BASIC') {
            this.basic++;
          } else {
            this.advance++;
          }
        }
        console.log('basic user is ', this.basic, ' advane user is', this.advance);


      }, err => {
        console.log('error in get user list');
      });
    } catch (error) {
      console.log('error in dashboard');
    }
  }




  showUnapproved() {
    this.router.navigate(['unApproved']);
  }
  goToOrder() {
    this.router.navigate(['order'])
  }
}
