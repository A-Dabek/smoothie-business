import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, of, switchMap, tap} from "rxjs";
import {EditableSmoothieItemComponent} from "../components/editable-smoothie-item.component";
import {SmoothieDetailsUpdate} from "../model/smoothie-details-update";
import {SmoothieViewModel} from "../model/smoothie-view-model";
import {SmoothieService} from "../services/smoothie.service";

@Component({
  selector: 'smoothie-manager-container',
  template: `
    <ng-container *ngIf="smoothies$ | async as smoothies">
      <editable-smoothie-item class="block" *ngFor="let smoothie of smoothies; trackBy: trackByFn"
                              [smoothie]="smoothie"
                              [loading]="loading"
                              (formSubmit)="onSubmit(smoothie, $event)">
      </editable-smoothie-item>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    EditableSmoothieItemComponent
  ]
})
export class SmoothieManagerContainer implements OnInit {

  loading = true;
  smoothies$: Observable<SmoothieViewModel[]> = of([]);
  private refresh$ = new BehaviorSubject<void>(undefined);
  private smoothieService = inject(SmoothieService);
  trackByFn = (index: number, item: SmoothieViewModel) => item.id;

  ngOnInit(): void {
    this.smoothies$ = this.refresh$.pipe(switchMap(() => this.smoothieService.getSmoothies()), tap(() => this.loading = false));
  }

  onSubmit(viewModel: SmoothieViewModel, value: SmoothieDetailsUpdate) {
    this.loading = true;
    this.smoothieService.updateSmoothie(viewModel.id, value).subscribe(() => this.refresh$.next());
  }
}
