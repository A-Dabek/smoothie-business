import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {EditableSmoothieItemComponent} from "../components/editable-smoothie-item.component";
import {SmoothieViewModel} from "../model/smoothie-view-model";
import {SmoothieService} from "../services/smoothie.service";

@Component({
  selector: 'smoothie-menu-container',
  template: `
    <ng-container *ngIf="smoothies$ | async as smoothies">
      <editable-smoothie-item class="block" *ngFor="let smoothie of smoothies" [smoothie]="smoothie">
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
export class SmoothieMenuContainer implements OnInit {

  smoothies$: Observable<SmoothieViewModel[]> = of([]);
  private smoothieService = inject(SmoothieService);

  ngOnInit(): void {
    this.smoothies$ = this.smoothieService.getSmoothies();
  }
}
