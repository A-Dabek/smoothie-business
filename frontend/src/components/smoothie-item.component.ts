import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {SmoothieViewModel} from "../model/smoothie-view-model";

@Component({
  selector: 'smoothie-item',
  styles: [`
    :host {
      display: block;
    }

    dd {
      margin-left: 0;
    }
  `],
  template: `
    <div class="card">
      <div class="card-content">
        <div class="is-flex is-justify-content-space-between">
          <div>
            <p class="title is-4">{{smoothie.name}}</p>
            <p class="subtitle is-6">{{smoothie.description}}</p>
          </div>
          <ng-content></ng-content>
        </div>

        <div class="content mt-3">
          <div class="columns">
            <div class="column is-6">
              <dl class="columns is-multiline is-mobile">
                <dt class="column is-6">Calories</dt>
                <dd class="column has-text-right is-6">{{calories}} kcal</dd>
                <dt class="column is-6">Protein</dt>
                <dd class="column has-text-right is-6">{{smoothie.protein}} g</dd>
                <dt class="column is-6">Fat</dt>
                <dd class="column has-text-right is-6">{{smoothie.fat}} g</dd>
                <dt class="column is-6">Carbs</dt>
                <dd class="column has-text-right is-6">{{smoothie.carbs}} g</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SmoothieItemComponent {
  @Input() smoothie!: SmoothieViewModel;

  get calories(): number {
    return this.smoothie.protein * 4 + this.smoothie.fat * 9 + this.smoothie.carbs * 4;
  }
}
