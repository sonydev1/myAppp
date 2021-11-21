import { Component, OnInit } from '@angular/core';
import { Listo } from '../../models';
import { FirestoreService } from '../../services/firestore.service';
import { ActividadService } from '../../services/actividad.service';


@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.page.html',
  styleUrls: ['./puntos.page.scss'],
})
export class PuntosPage implements OnInit {

  list: Listo;
  uid='';
  constructor(private firestoreService: FirestoreService,
              /* private actividadService: ActividadService, */
              ) {}

  ngOnInit() {

    this.getActividades();
  }


  getActividades(){
    const path = 'UserEstudiantes/' + this.uid + '/Realizado/'+ this.uid;
    this.firestoreService.getDoc<Listo>(path, this.uid).subscribe(res =>{
      this.list = res;
          console.log(res.fecha);
    });
  }


}
