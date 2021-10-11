import { PageInfoService } from '../../../services/page-info.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Actividad } from '../../../models';

@Component({
  selector: 'app-ver-actividad',
  templateUrl: './ver-actividad.page.html',
  styleUrls: ['./ver-actividad.page.scss'],
})
export class VerActividadPage implements OnInit {

  actividades: Actividad[]=[];

  private path = 'Actividades/';

  constructor(public firestoreService: FirestoreService,
              public edi: PageInfoService) { }


  ngOnInit() {
    this.getActividades();
  }

  getActividades(){
    this.firestoreService.getCollection<Actividad>(this.path).subscribe( res=>{
      console.log(res);
      this.actividades= res;
    });
  }
  deleteActividad(acti: Actividad){
    this.firestoreService.deleteDoc(this.path, acti.id);
    console.log('eliminado',acti.titulo);
  }

  editActividad(acti: Actividad){
    this.edi.setActividad(acti);
    console.log('di click en =>',acti);
  }

}
