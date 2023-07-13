import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {OrderService} from "./order.service";
import {SmoothieStateService} from "./smoothie-state.service";
import {SmoothieService} from "./smoothie.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [SmoothieService, OrderService, SmoothieStateService]
})
export class DataAccessModule {

}
