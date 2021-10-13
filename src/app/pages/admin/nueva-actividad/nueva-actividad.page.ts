import { Actividad } from '../../../models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoadingController, ToastController } from '@ionic/angular';





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
  loading: any;
  constructor(public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController) {}

  ngOnInit() {
  }

  guardarActividad() {
    this.presentLoading();
    this.firestoreService.createDoc(this.newActividad, this.path, this.newActividad.id).then( res =>{
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error =>{
      this.presentToast('NO se pudo guardar');
    });
    console.log('guardar');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'secondary',
      message: 'Guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:'secondary',
    });
    toast.present();
  }

}
