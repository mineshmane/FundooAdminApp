import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(private adminService: AdminServiceService, private router: Router) { }

  ngOnInit() {
    this.getAllUnApprovedQuestion();
  }
  answerArray = [];
  getAllUnApprovedQuestion() {
    console.log(" called");

    this.adminService.getUnapprovedQuestion().subscribe(data => {
      console.log(" called");
      
      console.log(data['data']);
      this.answerArray = data['data'];
    
      // console.log(" questions in admin unaprroved", this.answerArray);
      this.answerArray.reverse();

    }, err => {
      console.log(err);

    })
  }

  approveAnswer(index) {
    this.removeFromArray(index)

    this.adminService.approveAnswer(index.id).subscribe(data => {
      console.log(data);

    }, err => {
      console.log(err);

    })
  }


  rejectAnswer(index) {
    this.removeFromArray(index)
    this.adminService.rejectAnswer(index.id).subscribe(data => {
      console.log(data);


    }, error => {
      console.log(error);

    })
  }



  removeFromArray(item) {
    let index = this.answerArray.indexOf(item)
    this.answerArray.splice(index, 1);

  }
  Home() {
    this.router.navigate(['home'])
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

}
