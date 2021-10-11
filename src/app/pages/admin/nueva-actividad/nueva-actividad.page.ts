import { Actividad } from '../../../models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';





@Component({
  selector: 'app-nueva-actividad',
  templateUrl: './nueva-actividad.page.html',
  styleUrls: ['./nueva-actividad.page.scss'],
})
export class NuevaActividadPage implements OnInit {

  newActividad: Actividad ={
    id: this.firestoreService.getID(),
    titulo:'',
    punto:0,
    actividadI:null,
    actividadF:null,
  };

private path = 'Actividades/';

  constructor(public firestoreService: FirestoreService,
              ) {}

  ngOnInit() {
  }

  guardarActividad() {
    this.firestoreService.createDoc(this.newActividad, this.path, this.newActividad.id);
    console.log('guardar');

  }

}
