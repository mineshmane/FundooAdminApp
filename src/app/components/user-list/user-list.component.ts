import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  baseUrl = environment.baseUrl;

  basic = 0; advance = 0; preBasic = 0; preAdvance = 0; char = '';
  array = []; mainArray = []; pre = '';
  count = this.array.length
  getErrorMessageserver: string;

  constructor( private router: Router) {


    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.count
    };
  }
  public ngOnInit() {
    this.getUserList();
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
      $.ajax({
        url: this.baseUrl + "user/getAdminUserList",
        type: "get",
        dataType: "json",
        data: JSON.stringify({
          admintoken: localStorage.getItem('admintoken')
        }),
        contentType: 'application/json; charset=utf-8',
        success: (data: any) => {
          console.log('data is', data);
          this.mainArray = data['data']['data'];
          this.array = this.mainArray;
          // this.array.reverse();
          for (var i = 0; i < this.array.length; i++) {
            this.char = this.array[i].service;
            if (this.char == 'basic' || this.char == 'Basic' || this.char == 'BASIC') {
              this.basic++;
            } else {
              this.advance++;
            }
          }
          console.log('basic user is ', this.basic, ' advane user is', this.advance);
          // localStorage.setItem('admintoken', data['id']);
          // this.router.navigate(['home'])

        },
        error: ( textStatus) => {
          console.log('error data ', textStatus);
        },


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
