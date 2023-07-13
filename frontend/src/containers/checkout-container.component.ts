import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import {SmoothieSummaryComponent} from "../components/smoothie-summary.component";
import {OrderRequestBody} from "../model/order-request-body";
import {SmoothieSummaryViewModel} from "../model/smoothie-summary-view-model";
import {OrderService} from "../services/order.service";
import {SmoothieStateService} from "../services/smoothie-state.service";

@Component({
  selector: 'checkout-container',
  template: `
    <div class="card">
      <div class="card-content">
        <smoothie-summary *ngIf="smoothiesInCart$ | async as smoothies" [smoothies]="smoothies"/>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input"
                     [ngClass]="{'is-danger': form.controls.name.errors && form.controls.name.touched}"
                     type="text" placeholder="name"
                     formControlName="name">
            </div>
            <p *ngIf="form.controls.name.errors && form.controls.name.touched" class="help is-danger">This
              field is
              required</p>
          </div>

          <div class="field">
            <label class="label">Street</label>
            <div class="control">
              <input class="input"
                     [ngClass]="{'is-danger': form.controls.street.errors && form.controls.street.touched}"
                     type="text" placeholder="street"
                     formControlName="street">
            </div>
            <p *ngIf="form.controls.street.errors && form.controls.street.touched " class="help is-danger">
              This field is
              required</p>
          </div>

          <div class="field">
            <label class="label">City</label>
            <div class="control">
              <input class="input"
                     [ngClass]="{'is-danger': form.controls.city.errors && form.controls.city.touched}"
                     type="text" placeholder="city"
                     formControlName="city">
            </div>
            <p *ngIf="form.controls.city.errors && form.controls.city.touched" class="help is-danger">This
              field is
              required</p>
          </div>

          <div class="field">
            <label class="label">Zip</label>
            <div class="control">
              <input class="input"
                     [ngClass]="{'is-danger': form.controls.zip.errors && form.controls.zip.touched}"
                     type="text" placeholder="zip"
                     formControlName="zip">
            </div>
            <p *ngIf="form.controls.zip.errors && form.controls.zip.touched" class="help is-danger">This field
              is
              required</p>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" type="submit" [disabled]="loading">Submit</button>
            </div>
            <div class="control">
              <button class="button is-secondary" (click)="onCancel()">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    SmoothieSummaryComponent,
    AsyncPipe
  ]
})
export class CheckoutContainerComponent implements OnInit {

  loading = false;
  cart: Record<number, number> = {};
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.pattern(/\S/)]),
    street: this.fb.control('', [Validators.required, Validators.pattern(/\S/)]),
    city: this.fb.control('', [Validators.required, Validators.pattern(/\S/)]),
    zip: this.fb.control('', [Validators.required, Validators.pattern(/\S/)]),
  });

  private orderService = inject(OrderService);
  private stateService = inject(SmoothieStateService);
  smoothiesInCart$: Observable<SmoothieSummaryViewModel[]> = this.stateService.smoothies$.pipe(
    map(smoothies => {
      return smoothies.filter(smoothie => this.cart[smoothie.id]).map(smoothie => ({
        name: smoothie.name,
        description: smoothie.description,
        price: smoothie.price,
        count: this.cart[smoothie.id]
      }));
    })
  );

  ngOnInit() {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) {
      this.router.navigate(['/smoothies']);
      return;
    }
    this.cart = JSON.parse(savedCart);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const requestBody: OrderRequestBody = {
      ...this.form.getRawValue(),
      items: this.cart,
    };
    this.createOrder(requestBody).subscribe(
      () => this.onSuccessfulOrder(),
    );
  }

  onCancel() {
    this.router.navigate(['/smoothies']);
  }

  private createOrder(requestBody: OrderRequestBody) {
    return this.orderService.createOrder(requestBody).pipe(
      catchError(() => {
        alert('Error while updating smoothie details!');
        return throwError(() => new Error('Error while updating smoothie details!'));
      })
    );
  }

  private onSuccessfulOrder() {
    localStorage.setItem('cart', '{}');
    this.router.navigate(['/smoothies']);
  }
}
