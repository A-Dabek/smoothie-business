import {NgForOf} from "@angular/common";
import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {SmoothieSummaryViewModel} from "../model/smoothie-summary-view-model";

@Component({
  selector: 'smoothie-summary',
  template: `
    <ng-container *ngFor="let smoothie of smoothies">
      <div class="block is-flex is-justify-content-space-between">
        <div>
          <p class="title is-4">{{smoothie.name}}</p>
          <p class="subtitle is-6">{{smoothie.description}}</p>
        </div>
        <p class="title is-4">{{smoothie.count}} X {{'$' + smoothie.price / 100}}</p>
      </div>
    </ng-container>
    <div class="block is-flex is-justify-content-space-between">
      <p class="title is-3">Total</p>
      <p class="title is-3">{{'$' + total / 100}}</p>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf
  ]
})
export class SmoothieSummaryComponent implements OnChanges {
  @Input() smoothies: SmoothieSummaryViewModel[] = [];
  total = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.total = this.smoothies.reduce((acc, smoothie) => acc + smoothie.price * smoothie.count, 0);
  }
}
