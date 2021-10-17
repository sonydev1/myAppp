import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module'  ).then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'nueva-actividad',
    loadChildren: () => import('./pages/admin/nueva-actividad/nueva-actividad.module').then( m => m.NuevaActividadPageModule)
  },
  {
    path: 'ver-actividad',
    loadChildren: () => import('./pages/admin/ver-actividad/ver-actividad.module').then( m => m.VerActividadPageModule)
  },
  {
    path: 'nuevo-estudiante',
    loadChildren: () => import('./pages/admin/nuevo-estudiante/nuevo-estudiante.module').then( m => m.NuevoEstudiantePageModule)
  },
  {
    path: 'listado-estudiante',
    loadChildren: () => import('./pages/admin/listado-estudiante/listado-estudiante.module').then( m => m.ListadoEstudiantePageModule)
  },
  {
    path: 'puntos-estudiante',
    loadChildren: () => import('./pages/admin/puntos-estudiante/puntos-estudiante.module').then( m => m.PuntosEstudiantePageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/admin/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'edit-activida',
    loadChildren: () => import('./pages/admin/edit-activida/edit-activida.module').then( m => m.EditActividaPageModule)
  },  {
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'puntos',
    loadChildren: () => import('./pages/puntos/puntos.module').then( m => m.PuntosPageModule)
  },
  {
    path: 'info-actividad',
    loadChildren: () => import('./pages/info-actividad/info-actividad.module').then( m => m.InfoActividadPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
