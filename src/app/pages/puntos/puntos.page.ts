import { Component, OnInit } from '@angular/core';
import { Listo, User } from '../../models';
import { FirestoreService } from '../../services/firestore.service';
import { ActividadService } from '../../services/actividad.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.page.html',
  styleUrls: ['./puntos.page.scss'],
})
export class PuntosPage implements OnInit {


  listo: Listo;
  path = 'UserEstudiantes/';
  uid='';
  user: User;
  data =[];
  totalPunto: number;
  periodo: string;
  vperiodo: string;

  constructor(private firestoreService: FirestoreService,
              private firebaseauthService: FirebaseauthService,
              public router: Router,
              private actividadService: ActividadService,
              ) {
                this.estatu();
                this.loadActividad();
              }

  ngOnInit() {}

estatu(){
  this.firebaseauthService.stateAuth().subscribe(res =>{
    if (res === null || res === undefined) {
      console.log('no puedo pasar');
      this.router.navigate(['/login']);
    }else{
      this.uid =res.uid;
      console.log('ok');
    }
  });
}



loadActividad(){
  this.firebaseauthService.stateAuth().subscribe(res =>{
    if (res === null || res === undefined) {
      console.log('no puedo pasar');
      this.router.navigate(['/login']);
    }else{
      this.uid =res.uid;
      const path = 'UserEstudiantes/' + res.uid + '/Realizado';
      this.firestoreService.getDoc<Listo>(path, res.uid).subscribe(rest =>{
        this.data = Object.values(rest.actividades);
        console.log('actividades =>',this.data.length);
        rest.actividades.forEach(peri=>{
          console.log(peri.periodo);
          this.periodo = peri.periodo;
        });

        this.totalPunto= 0;
        rest.actividades.forEach(punt =>{
            this.totalPunto = (punt.punto) + this.totalPunto ;
          console.log(this.totalPunto);
        });
    });
    }
  });
}


}

