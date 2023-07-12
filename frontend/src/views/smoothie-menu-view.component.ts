import {ChangeDetectionStrategy, Component} from "@angular/core";
import {SmoothieMenuContainer} from "../containers/smoothie-menu.container";

@Component({
  selector: 'smoothie-menu-view',
  template: `
    <smoothie-menu-container></smoothie-menu-container>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SmoothieMenuContainer
  ]
})
export class SmoothieMenuViewComponent {

}
