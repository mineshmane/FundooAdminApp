import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
  static postRequest: any;
  constructor(private http: HttpClient) { }
  //sending post request to server
  postRequest(url, data) {
    console.log(data);
    return this.http.post(this.baseUrl + url, data);
  }



  getRequest(url) {
    return this.http.get(this.baseUrl + url);
  }

  getHttp(url, token) {

    // if (token) {
      const httpOption = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('admintoken')
        })
      }
      return this.http.get(this.baseUrl + url, httpOption);
    // }
 //   return (this.http.get(this.baseUrl + url));

  }

  postHttp(url, data, token) {
    if (token) {
      const httpOption = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('admintoken')
        })
      }
      return this.http.post(this.baseUrl + url, data, httpOption);
    }
    return (this.http.get(this.baseUrl + url, data));
  }

}
