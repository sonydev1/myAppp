import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntosEstudiantePageRoutingModule } from './puntos-estudiante-routing.module';

import { PuntosEstudiantePage } from './puntos-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntosEstudiantePageRoutingModule
  ],
  declarations: [PuntosEstudiantePage]
})
export class PuntosEstudiantePageModule {}
