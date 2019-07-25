import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpService } from '../httpService/http.service';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private httpService: HttpService) { }
  loginAdmin() {

  }
  private messageSource = new BehaviorSubject({ type: '', data: [] });
  currentMessage = this.messageSource.asObservable();



  changeMessage(message: any) {
    console.log(" data service called", message);
    this.messageSource.next(message)
  }






  getUnapprovedQuestion() {
    return this.httpService.getHttp('questionAndAnswerNotes/getUnApprovedAnswer', true);
  }


  approveAnswer(id) {
    return this.httpService.postHttp('questionAndAnswerNotes/approve/' + id, id, true);
  }
  rejectAnswer(id) {
    return this.httpService.postHttp('questionAndAnswerNotes/reject/' + id, id, true);

  }

  getAllPlacedOrder() {
    return this.httpService.getHttp('productcarts/userCartList', true);

  }

  completeOrder(data) {
    return this.httpService.postHttp('productcarts/adminCompleteOrder', data, true);
  }
  cancelOrder(data) {
    return this.httpService.postHttp('productcarts/adminCancelOrder', data, true);

  }
}
