import {inject, Injectable} from "@angular/core";
import {ReplaySubject, shareReplay, switchMap, tap} from "rxjs";
import {SmoothieService} from "./smoothie.service";

@Injectable()
export class SmoothieStateService {
  private smoothieService = inject(SmoothieService);
  private readonly smoothies$$ = new ReplaySubject<void>(1);

  readonly smoothies$ = this.smoothies$$.pipe(
    tap(() => console.log('loading smoothies...')),
    switchMap(() => this.smoothieService.getSmoothies()),
    shareReplay(1),
  );

  constructor() {
    this.loadSmoothies();
  }

  loadSmoothies() {
    this.smoothies$$.next(undefined);
  }
}
