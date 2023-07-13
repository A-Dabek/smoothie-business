import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {SmoothieViewModel} from "../model/smoothie-view-model";
import {SmoothieItemComponent} from "./smoothie-item.component";

@Component({
  selector: 'buyable-smoothie-item',
  styles: [`
    :host {
      display: block;
    }
  `],
  template: `
    <div class="card">
      <div class="card-content">
        <smoothie-item class="block" [smoothie]="smoothie">
          <ng-container *ngTemplateOutlet="addToCart"></ng-container>
        </smoothie-item>
      </div>
    </div>

    <ng-template #addToCart>
      <button *ngIf="inCart === 0" class="button is-primary"
              data-testId="cart-icon"
              (click)="added.emit()">
            <span class="icon is-small">
                <i class="fas fa-cart-plus"></i>
            </span>
      </button>
      <div class="is-flex is-align-items-baseline" *ngIf="inCart > 0">
        <button class="button mr-1"
                data-testId="minus-icon" (click)="removed.emit()">
            <span class="icon is-small">
                <i class="fas fa-minus"></i>
            </span>
        </button>
        <p class="mr-1">{{inCart}}</p>
        <button class="button"
                data-testId="plus-icon" (click)="added.emit()">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
        </button>
      </div>
    </ng-template>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    SmoothieItemComponent,
    NgClass,
    NgTemplateOutlet,
  ]
})
export class BuyableSmoothieItemComponent {
  @Input() smoothie!: SmoothieViewModel;
  @Input() inCart = 0;
  @Output() added = new EventEmitter<void>();
  @Output() removed = new EventEmitter<void>();
}
