import {NgClass, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SmoothieDetailsUpdate} from "../model/smoothie-details-update";
import {SmoothieViewModel} from "../model/smoothie-view-model";

@Component({
  selector: 'smoothie-form',
  template: `
    <form class="mt-3" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input"
                 [ngClass]="{'is-danger': form.controls.name.errors}"
                 type="text" placeholder="name"
                 formControlName="name">
        </div>
        <p *ngIf="form.controls.name.errors" class="help is-danger">This field is required</p>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input class="input"
                 [ngClass]="{'is-danger': form.controls.description.errors}"
                 type="text" placeholder="description"
                 formControlName="description">
        </div>
        <p *ngIf="form.controls.description.errors" class="help is-danger">This field is required</p>
      </div>

      <div class="field">
        <label class="label">Protein</label>
        <div class="control">
          <input class="input"
                 [ngClass]="{'is-danger': form.controls.protein.errors}"
                 type="number"
                 placeholder="protein"
                 formControlName="protein">
        </div>
        <p *ngIf="form.controls.protein.errors" class="help is-danger">Provide non-negative value</p>
      </div>

      <div class="field">
        <label class="label">Fat</label>
        <div class="control">
          <input class="input"
                 [ngClass]="{'is-danger': form.controls.fat.errors}"
                 type="number" placeholder="fat"
                 formControlName="fat">
        </div>
        <p *ngIf="form.controls.fat.errors" class="help is-danger">Provide non-negative value</p>
      </div>

      <div class="field">
        <label class="label">Carbs</label>
        <div class="control">
          <input class="input"
                 [ngClass]="{'is-danger': form.controls.carbs.errors}"
                 type="number" placeholder="carbs"
                 formControlName="carbs">
        </div>
        <p *ngIf="form.controls.carbs.errors" class="help is-danger">Provide non-negative value</p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" type="submit" [disabled]="disabled">Submit</button>
        </div>
        <div class="control">
          <button class="button is-secondary" (click)="cancel.emit()">Cancel</button>
        </div>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ]
})
export class SmoothieFormComponent {
  model!: SmoothieViewModel;

  form = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.pattern(/\S/)]),
    description: this.fb.control('', [Validators.required]),
    protein: this.fb.control(0, [Validators.required, Validators.min(0)]),
    fat: this.fb.control(0, [Validators.required, Validators.min(0)]),
    carbs: this.fb.control(0, [Validators.required, Validators.min(0)]),
  });

  @Input() disabled = false;
  @Output() formSubmit = new EventEmitter<SmoothieDetailsUpdate>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: NonNullableFormBuilder) {
  }

  @Input() set smoothie(v: SmoothieViewModel) {
    this.model = v;
    this.form.patchValue(v);
  }

  onSubmit() {
    if (this.form.invalid) return;
    const formValue = this.form.getRawValue()
    this.formSubmit.emit(formValue);
  }
}
