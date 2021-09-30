import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoEstudiantePageRoutingModule } from './listado-estudiante-routing.module';

import { ListadoEstudiantePage } from './listado-estudiante.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoEstudiantePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoEstudiantePage]
})
export class ListadoEstudiantePageModule {}
