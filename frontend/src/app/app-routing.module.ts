import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'manage/smoothies',
    loadComponent: () => import('../views/smoothie-manager-view.component').then(m => m.SmoothieManagerViewComponent)
  },
  {
    path: 'smoothies',
    loadComponent: () => import('../views/smoothie-menu-view.component').then(m => m.SmoothieMenuViewComponent)
  },
  {
    path: '**',
    redirectTo: 'smoothies',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
