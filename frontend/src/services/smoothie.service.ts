import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {SmoothieResponseBody} from "../model/smoothie-response-body";

@Injectable()
export class SmoothieService {
  private http = inject(HttpClient);

  // FIXME for dev purposes only
  private mockedResponse: SmoothieResponseBody[] = [
    {
      "id": 1,
      "name": "Banana Smoothie",
      "description": "banana, milk, ice",
      "protein": 2,
      "fat": 3,
      "carbs": 1
    },
    {
      "id": 2,
      "name": "Strawberry smoothie",
      "description": "strawberry, milk, ice",
      "protein": 5,
      "fat": 6,
      "carbs": 4
    },
    {
      "id": 3,
      "name": "Mango smoothie",
      "description": "mango, milk, ice",
      "protein": 8,
      "fat": 9,
      "carbs": 7
    },
    {
      "id": 4,
      "name": "Pineapple smoothie",
      "description": "pineapple, milk, ice",
      "protein": 11,
      "fat": 12,
      "carbs": 10
    },
    {
      "id": 5,
      "name": "Blueberry smoothie",
      "description": "blueberry, milk, ice",
      "protein": 14,
      "fat": 15,
      "carbs": 13
    },
    {
      "id": 6,
      "name": "Raspberry smoothie",
      "description": "raspberry, milk, ice",
      "protein": 17,
      "fat": 18,
      "carbs": 16
    },
    {
      "id": 7,
      "name": "Peach smoothie",
      "description": "peach, milk, ice",
      "protein": 20,
      "fat": 21,
      "carbs": 19
    },
    {
      "id": 8,
      "name": "Apple smoothie",
      "description": "apple, milk, ice",
      "protein": 23,
      "fat": 24,
      "carbs": 22
    },
    {
      "id": 9,
      "name": "Orange smoothie",
      "description": "orange, milk, ice",
      "protein": 26,
      "fat": 27,
      "carbs": 25
    },
    {
      "id": 10,
      "name": "Kiwi smoothie",
      "description": "kiwi, milk, ice",
      "protein": 29,
      "fat": 30,
      "carbs": 28
    }
  ];

  getSmoothies(): Observable<SmoothieResponseBody[]> {
    return this.http.get<SmoothieResponseBody[]>('/api/smoothies').pipe(
      catchError(() => of(this.mockedResponse)),
    );
  }
}
