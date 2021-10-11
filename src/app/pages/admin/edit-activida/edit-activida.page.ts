import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PageInfoService } from 'src/app/services/page-info.service';
import { Actividad } from '../../../models';

@Component({
  selector: 'app-edit-activida',
  templateUrl: './edit-activida.page.html',
  styleUrls: ['./edit-activida.page.scss'],
})
export class EditActividaPage implements OnInit {

  newActividad: Actividad ={
    id: this.firestoreService.getID(),
    titulo:'',
    punto:0,
    actividadI:null,
    actividadF:null,
  };
  private path = 'Actividades/';

  constructor(public firestoreService: FirestoreService,
              public edit: PageInfoService) { }

  ngOnInit() {
    const editar = this.edit.getActividad();
    console.log('la actividada esditar es -> ',editar);
    if (editar !== undefined) {
      this.newActividad = editar;
    }
  }

  guardarActividad() {
    this.firestoreService.createDoc(this.newActividad, this.path, this.newActividad.id);
    console.log('guardar');

  }

}
