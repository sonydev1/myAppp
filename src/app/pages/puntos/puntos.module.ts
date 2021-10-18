import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntosPageRoutingModule } from './puntos-routing.module';

import { PuntosPage } from './puntos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PuntosPage]
})
export class PuntosPageModule {}
