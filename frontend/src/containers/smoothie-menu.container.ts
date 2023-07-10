import {NgForOf} from "@angular/common";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {SmoothieItemComponent} from "../components/smoothie-item.component";

@Component({
  selector: 'smoothie-menu-container',
  template: `
    <smoothie-item *ngFor="let smoothie of smoothies"></smoothie-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SmoothieItemComponent,
    NgForOf
  ]
})
export class SmoothieMenuContainer {

  smoothies = [
    {},
    {},
    {},
    {},
  ];

}
