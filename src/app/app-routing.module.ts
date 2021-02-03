import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetallePage } from './detalle/detalle.page';
import { HomePage } from './home/home.page';
import { ResumenPage } from './resumen/resumen.page';

const routes: Routes = [
  {
    path: 'home',
    component:HomePage
  },
  {
    path: 'detalle',
    component:DetallePage
  },
  {
    path: 'resumen',
    component:ResumenPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
