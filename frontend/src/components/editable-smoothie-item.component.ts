import {NgClass, NgIf} from "@angular/common";
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
    <div class="card">
      <div class="card-content">
        <smoothie-item *ngIf="!editMode" class="block" [smoothie]="smoothie">
          <button class="button is-warning" [ngClass]="{'is-loading': loading}" [disabled]="loading"
                  (click)="editMode = true">
            <span>Edit</span>
            <span class="icon is-small">
          <i class="fas fa-edit"></i>
        </span>
          </button>
        </smoothie-item>
        <smoothie-form *ngIf="editMode" [smoothie]="smoothie" [disabled]="loading" (cancel)="editMode = false"
                       (formSubmit)="onSubmit($event)"></smoothie-form>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    SmoothieFormComponent,
    SmoothieItemComponent,
    NgClass,
  ]
})
export class EditableSmoothieItemComponent {
  @Input() smoothie!: SmoothieViewModel;
  @Input() loading = false;
  editMode = false;

  @Output() formSubmit = new EventEmitter<SmoothieDetailsUpdate>();

  onSubmit(value: SmoothieDetailsUpdate) {
    this.editMode = false;
    this.formSubmit.emit(value);
  }
}
