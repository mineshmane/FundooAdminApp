import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AdminServiceService } from '../../services/admin/admin-service.service';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  basic = 0; advance = 0; preBasic = 0; preAdvance = 0; char = '';
  array = []; mainArray = []; pre = '';
  baseUrl = environment.baseUrl;
  constructor(private router: Router, private dataService: AdminServiceService) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  
  values: any = '';
  // values=this.value;

  search(event: any) {
    console.log("message in ts  dash ");
    // this.route.navigate(['dashboard/search']);

    this.values = event.target.value;
    this.dataService.changeMessage({
      type: 'search',
      data: this.values
    })
    //this.ab = this.values;

  }

  // //when user hit in search button it works
  // onKeyUp(event: any) {
  //   //storing value in previous
  //   this.pre = this.values;
  //   this.values = event.target.value;
  //   if (this.values.length < this.pre.length) {//when user hit back space
  //     this.array = this.mainArray;
  //   }
  //   //method for name filtering
  //   var checkName = (item: any) => {
  //     // console.log('item ',item.firstName.toLowerCase(),'  value ',this.values.toLowerCase())
  //     return item.firstName.toLowerCase().startsWith(this.values.toLowerCase());
  //   }
  //   //array filter
  //   this.array = this.array.filter(function (item) {
  //     // console.log('item',item);
  //     return checkName(item);
  //   });
  //   console.log(this.array);

  //   for (var i = 0; i < this.array.length; i++) {
  //     this.char = this.array[i].service;
  //     if (this.char == 'basic' || this.char == 'Basic' || this.char == 'BASIC') {
  //       this.preBasic++;
  //     } else {
  //       this.preAdvance++;
  //     }
  //   }
  //   this.basic = this.preBasic, this.advance = this.preAdvance;
  //   this.preBasic = 0, this.preAdvance = 0;

  // };
}
