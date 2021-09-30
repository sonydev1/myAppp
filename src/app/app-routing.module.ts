import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'nueva-actividad',
    loadChildren: () => import('./pages/nueva-actividad/nueva-actividad.module').then( m => m.NuevaActividadPageModule)
  },
  {
    path: 'ver-actividad',
    loadChildren: () => import('./pages/ver-actividad/ver-actividad.module').then( m => m.VerActividadPageModule)
  },
  {
    path: 'nuevo-estudiante',
    loadChildren: () => import('./pages/nuevo-estudiante/nuevo-estudiante.module').then( m => m.NuevoEstudiantePageModule)
  },
  {
    path: 'listado-estudiante',
    loadChildren: () => import('./pages/listado-estudiante/listado-estudiante.module').then( m => m.ListadoEstudiantePageModule)
  },
  {
    path: 'puntos-estudiante',
    loadChildren: () => import('./pages/puntos-estudiante/puntos-estudiante.module').then( m => m.PuntosEstudiantePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
