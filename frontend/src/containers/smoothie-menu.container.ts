import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {BuyableSmoothieItemComponent} from "../components/buyable-smoothie-item.component";
import {SmoothieViewModel} from "../model/smoothie-view-model";
import {SmoothieService} from "../services/smoothie.service";

@Component({
  selector: 'smoothie-menu-container',
  template: `
    <ng-container *ngIf="smoothies$ | async as smoothies">
      <buyable-smoothie-item class="block" *ngFor="let smoothie of smoothies; trackBy: trackByFn"
                             [smoothie]="smoothie"
                             [inCart]="cart[smoothie.id] || 0"
                             (added)="addToCart(smoothie)"
                             (removed)="removeFromCart(smoothie)">
      </buyable-smoothie-item>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    BuyableSmoothieItemComponent,
  ]
})
export class SmoothieMenuContainer implements OnInit {

  smoothies$: Observable<SmoothieViewModel[]> = of([]);
  cart: Record<number, number> = {};
  private smoothieService = inject(SmoothieService);

  trackByFn = (index: number, item: SmoothieViewModel) => item.id;

  ngOnInit(): void {
    this.smoothies$ = this.smoothieService.getSmoothies();
  }

  addToCart(smoothie: SmoothieViewModel) {
    this.cart[smoothie.id] = (this.cart[smoothie.id] || 0) + 1;
  }

  removeFromCart(smoothie: SmoothieViewModel) {
    this.cart[smoothie.id] = (this.cart[smoothie.id] || 0) - 1;
  }
}
