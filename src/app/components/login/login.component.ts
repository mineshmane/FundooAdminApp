import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdminServiceService } from '../../services/admin/admin-service.service'
import { AuthService } from '../../services/AuthService/auth.service'
import { HttpService } from '../../services/httpService/http.service'
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
  constructor(private adminService: AdminServiceService, private router: Router) { }

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
      // if (data.email == '' || data.password == '') {

      //   this.getErrorMessageserver = "Field required";
      //   return;
      // } else if (data.email.hasError('required') || data.email.hasError('email') || data.password.hasError('required') || data.password.hasError('minlength') || data.password.hasError('maxlength')) {
      //   return;
      // } else {

        


        // using ajax jquery
        $.ajax({
          url: "http://34.213.106.173/api/user/adminLogin",
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

         // timeout: 120000,
        });

        //sending request to server
      // }
    } catch (err) {
      console.log("error in login");
    }
  }
}
