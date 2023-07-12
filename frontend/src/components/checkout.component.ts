import {NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  selector: 'smoothie-checkout',
  host: {
    class: 'block'
  },
  styles: [`
    :host {
      position: sticky;
      top: 0.25rem;
      z-index: 100;
    }
  `],
  template: `
    <button class="button is-primary is-fullwidth">
      Checkout <span *ngIf="count">&nbsp;({{count}})</span>
    </button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ]
})
export class CheckoutComponent {
  @Input() count = 0;
}
