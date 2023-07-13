import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BuyableSmoothieItemComponent} from "../components/buyable-smoothie-item.component";
import {CheckoutComponent} from "../components/checkout.component";
import {SmoothieViewModel} from "../model/smoothie-view-model";
import {SmoothieStateService} from "../services/smoothie-state.service";

@Component({
  selector: 'smoothie-menu-container',
  template: `
    <smoothie-checkout *ngIf="checkoutCount" [count]="checkoutCount" (navigate)="goToCheckout()"/>
    <ng-container *ngIf="smoothies$ | async as smoothies">
      <buyable-smoothie-item class="block" *ngFor="let smoothie of smoothies; trackBy: trackByFn"
                             [smoothie]="smoothie"
                             [inCart]="cart[smoothie.id] || 0"
                             (added)="addToCart(smoothie)"
                             (removed)="removeFromCart(smoothie)"/>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    BuyableSmoothieItemComponent,
    CheckoutComponent,
  ]
})
export class SmoothieMenuContainer implements OnInit {

  checkoutCount = 0;
  cart: Record<number, number> = {};
  private router = inject(Router);
  private stateService = inject(SmoothieStateService);
  smoothies$: Observable<SmoothieViewModel[]> = this.stateService.smoothies$;

  trackByFn = (index: number, item: SmoothieViewModel) => item.id;

  ngOnInit(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.recalculateCount();
    }
  }

  addToCart(smoothie: SmoothieViewModel) {
    this.cart[smoothie.id] = (this.cart[smoothie.id] || 0) + 1;
    this.recalculateCount();
  }

  removeFromCart(smoothie: SmoothieViewModel) {
    this.cart[smoothie.id] = (this.cart[smoothie.id] || 0) - 1;
    this.recalculateCount();
  }

  goToCheckout() {
    this.router.navigate(['smoothies/checkout']);
  }

  private recalculateCount() {
    this.checkoutCount = Object.values(this.cart).reduce((a, b) => a + b, 0);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
