import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {delay, Observable} from "rxjs";
import {OrderRequestBody} from "../model/order-request-body";

@Injectable()
export class OrderService {
  private http = inject(HttpClient);

  createOrder(body: OrderRequestBody): Observable<unknown> {
    return this.http.post(`/api/smoothies/orders`, body).pipe(
      delay(1000)
    );
  }
}
