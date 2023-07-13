import {TestBed} from "@angular/core/testing";
import {BuyableSmoothieItemComponent} from "./buyable-smoothie-item.component";

describe('BuyableSmoothieItemComponent', () => {
  function setup(options?: {
    inCart?: number,
  }) {
    TestBed.configureTestingModule({
      imports: [
        BuyableSmoothieItemComponent,
      ]
    });
    const fixture = TestBed.createComponent(BuyableSmoothieItemComponent);
    const component = fixture.componentInstance;
    component.inCart = options?.inCart ?? 0;
    component.smoothie = {
      id: 1,
      name: 'Test',
      price: 1,
      description: 'Test',
      protein: 1,
      carbs: 1,
      fat: 1,
    };
    fixture.detectChanges();
    const elements = {
      cartIcon: () => fixture.nativeElement.querySelector('[data-testId="cart-icon"]'),
      minusIcon: () => fixture.nativeElement.querySelector('[data-testId="minus-icon"]'),
      plusIcon: () => fixture.nativeElement.querySelector('[data-testId="plus-icon"]'),
    };
    const addedSpy = spyOn(component.added, 'emit');
    const removedSpy = spyOn(component.removed, 'emit');
    return {fixture, component, addedSpy, removedSpy, elements};
  }

  it('should show cart icon if no items are in the cart', () => {
    const {elements, addedSpy} = setup({inCart: 0});
    expect(elements.cartIcon()).toBeTruthy();
    expect(elements.minusIcon()).toBeFalsy();
    expect(elements.plusIcon()).toBeFalsy();

    elements.cartIcon().click();
    expect(addedSpy).toHaveBeenCalled();
  });

  it('should show plus and minus icon if items are in the cart', () => {
    const {elements, addedSpy, removedSpy} = setup({inCart: 1});
    expect(elements.cartIcon()).toBeFalsy();
    expect(elements.minusIcon()).toBeTruthy();
    expect(elements.plusIcon()).toBeTruthy();

    elements.plusIcon().click();
    expect(addedSpy).toHaveBeenCalled();

    elements.minusIcon().click();
    expect(removedSpy).toHaveBeenCalled();
  });
});
