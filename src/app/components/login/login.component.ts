import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'
import * as $ from 'jquery'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  getErrorMessageserver = '';
  baseurl = environment.baseUrl;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  adminLogin(data) {
    console.log(" login called", data);

    // when user click submit button

    try {
      // using ajax jquery
      $.ajax({
        url: this.baseurl + "user/adminLogin",
        type: "post",
        dataType: "json",
        data: JSON.stringify({
          "email": data.email,
          "password": data.password
        }),
        contentType: 'application/json; charset=utf-8',
        success: (data: any) => {
          console.log(data, 'data is', data['id']);
          localStorage.setItem('admintoken', data['id']);
          this.router.navigate(['home'])

        },
        error: (jqXHR, textStatus, errorThrown) => {
          this.getErrorMessageserver = "unAuthorized User";
          console.log('error data ', textStatus);
        },


      });


      // }
    } catch (err) {
      console.log("error in login");
    }
  }
}
