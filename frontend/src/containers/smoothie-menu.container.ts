import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {SmoothieItemComponent} from "../components/smoothie-item.component";
import {SmoothieResponseBody} from "../model/smoothie-response-body";
import {SmoothieService} from "../services/smoothie.service";

@Component({
  selector: 'smoothie-menu-container',
  template: `
    <ng-container *ngIf="smoothies$ | async as smoothies">
      <smoothie-item class="block" *ngFor="let smoothie of smoothies"></smoothie-item>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SmoothieItemComponent,
    NgForOf,
    AsyncPipe,
    NgIf
  ]
})
export class SmoothieMenuContainer implements OnInit {

  smoothies$: Observable<SmoothieResponseBody[]> = of([]);
  private smoothieService = inject(SmoothieService);

  ngOnInit(): void {
    this.smoothies$ = this.smoothieService.getSmoothies();
  }
}
