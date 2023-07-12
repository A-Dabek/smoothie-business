import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="container is-max-desktop pt-5">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
}
