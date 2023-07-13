import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {catchError, delay, Observable, of} from "rxjs";
import {SmoothieDetailsUpdateRequestBody} from "../model/smoothie-details-update-request-body";
import {SmoothieResponseBody} from "../model/smoothie-response-body";

@Injectable()
export class SmoothieService {
  private http = inject(HttpClient);

  getSmoothies(): Observable<SmoothieResponseBody[]> {
    return this.http.get<SmoothieResponseBody[]>('/api/smoothies').pipe(
      catchError(() => {
        alert('Error while fetching smoothies!');
        return of([]);
      }),
    );
  }

  updateSmoothie(id: number, requestBody: SmoothieDetailsUpdateRequestBody): Observable<unknown> {
    return this.http.put<SmoothieDetailsUpdateRequestBody>(`/api/smoothies/${id}/details`, requestBody).pipe(
      delay(1000),
      catchError(() => {
        alert('Error while updating smoothie details!');
        return of(undefined);
      }),
    );
  }
}
