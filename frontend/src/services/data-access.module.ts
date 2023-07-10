import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {SmoothieService} from "./smoothie.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [SmoothieService]
})
export class DataAccessModule {

}
