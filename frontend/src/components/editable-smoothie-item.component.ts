import {NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {SmoothieDetailsUpdate} from "../model/smoothie-details-update";
import {SmoothieViewModel} from "../model/smoothie-view-model";
import {SmoothieFormComponent} from "./smoothie-form.component";
import {SmoothieItemComponent} from "./smoothie-item.component";

@Component({
  selector: 'editable-smoothie-item',
  styles: [`
    :host {
      display: block;
    }
  `],
  template: `
    <smoothie-item *ngIf="!editMode" class="block" [smoothie]="smoothie">
      <button class="button is-warning" (click)="editMode = true">
        <span>Edit</span>
        <span class="icon is-small">
                <i class="fas fa-edit"></i>
            </span>
      </button>
    </smoothie-item>
    <smoothie-form *ngIf="editMode" [smoothie]="smoothie" (cancel)="editMode = false"
                   (submit)="onSubmit($event)"></smoothie-form>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    SmoothieFormComponent,
    SmoothieItemComponent,
  ]
})
export class EditableSmoothieItemComponent {
  @Input() smoothie!: SmoothieViewModel;
  editMode = false;

  @Output() submit = new EventEmitter<SmoothieDetailsUpdate>();

  onSubmit(value: SmoothieDetailsUpdate) {
    this.editMode = false;
    this.submit.emit(value);
  }
}
