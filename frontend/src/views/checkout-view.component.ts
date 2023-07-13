import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CheckoutContainerComponent} from "../containers/checkout-container.component";

@Component({
  selector: 'checkout-view',
  template: `
    <checkout-container></checkout-container>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CheckoutContainerComponent
  ]
})
export class CheckoutViewComponent {

}
