import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-nueva-actividad',
  templateUrl: './nueva-actividad.page.html',
  styleUrls: ['./nueva-actividad.page.scss'],
})
export class NuevaActividadPage implements OnInit {
  title: string;
  punto: number;
  inicio: Date;
  fin: Date;
  constructor(public firestoreService: FirestoreService) {}

  ngOnInit() {}

  guardarActividad() {
    const data = {
      titulo: this.title,
      puntos: this.punto,
      inicio: this.inicio,
      fin: this.fin,
    };
    const path = 'actividades/';
    const id = 'actisada00';
    this.firestoreService.createDoc(data, path, id);

    console.log('guardar');
    console.log(this.inicio);
  }
}
