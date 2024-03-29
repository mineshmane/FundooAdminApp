import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  baseUrl = environment.baseUrl;

  constructor( private router: Router) { }

  ngOnInit() {
    this.getAllUnApprovedQuestion();
  }
  answerArray = [];
  getAllUnApprovedQuestion() {
    console.log(" called");
    $.ajax({
      url: this.baseUrl + "questionAndAnswerNotes/getUnApprovedAnswer",
      type: "get",
      dataType: "json",
      headers: {
        'Authorization': localStorage.getItem('admintoken')
      },
      contentType: 'application/json; charset=utf-8',
      success: (data: any) => {
        console.log('data is', data);
        this.answerArray = data['data'];
        this.answerArray.reverse();


      },
      error: (textStatus, ) => {
        console.log('error data ', textStatus);
      },


    });





  }

  approveAnswer(index) {
    this.removeFromArray(index)


    $.ajax({
      url:this.baseUrl+ "questionAndAnswerNotes/approve/" + index.id,
      type: "post",
      dataType: "json",
      headers: {
        'Authorization': localStorage.getItem('admintoken')
      },
      data: JSON.stringify({
        id: index.id
      }),
      contentType: 'application/json; charset=utf-8',
      success: (data: any) => {
        console.log('data is', data);


      },
      error: (textStatus) => {
        console.log('error data ', textStatus);
      },


    });

  }


  rejectAnswer(index) {


    $.ajax({
      url:this.baseUrl+"questionAndAnswerNotes/reject/" + index.id,
      type: "post",
      dataType: "json",
      headers: {
        'Authorization': localStorage.getItem('admintoken')
      },
      data: JSON.stringify({
        id: index.id
      }),
      contentType: 'application/json; charset=utf-8',
      success: (data: any) => {
        console.log('data is', data);
        this.removeFromArray(index)

      },
      error: (error) => {
        console.log('error data ', error);
      },


    });
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
