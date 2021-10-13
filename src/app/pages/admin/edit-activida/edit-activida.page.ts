import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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
              public edit: PageInfoService,
              public loadingController: LoadingController,
              public toastController: ToastController) { }

  ngOnInit() {
    const editar = this.edit.getActividad();
    console.log('la actividada esditar es -> ',editar);
    if (editar !== undefined) {
      this.newActividad = editar;
    }
  }

  actualizarActividad() {
    this.firestoreService.createDoc(this.newActividad, this.path, this.newActividad.id).then( res =>{
          this.presentToast('Guardado con exito');
        }).catch(error =>{
          this.presentToast('NO se pudo guardar');
        });
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


