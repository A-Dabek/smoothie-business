import {ChangeDetectionStrategy, Component} from "@angular/core";
import {SmoothieManagerContainer} from "../containers/smoothie-manager.container";

@Component({
  selector: 'smoothie-manager-view',
  template: `
    <smoothie-manager-container></smoothie-manager-container>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SmoothieManagerContainer
  ]
})
export class SmoothieManagerViewComponent {

}
