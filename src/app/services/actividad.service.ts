import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actividad, Listo, User } from '../models';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private list: Listo;

  path = 'realizado/';

  uid = '';

  user: User;

  constructor(private firebaseauthService: FirebaseauthService,
              private firestoreService: FirestoreService,
              private router: Router,
              private toastController:ToastController,
              private alertController: AlertController) {

    this.firebaseauthService.stateAuth().subscribe(res =>{
      if (res !== null) {
        this.uid = res.uid;
        console.log('pasar a agregar atividad');
        this.loadUSer();

      }
    });
  }

  loadActividad(){
    const path = 'UserEStudiante/' + this.uid + '/Realizado';
    this.firestoreService.getDoc<Listo>(path, this.uid).subscribe(res =>{
          console.log(res);
          if(res){
            this.list = res;
          }else{
            this.initRealizado();
          }
    });
  }

  initRealizado(){
    this.list={
        id: this.uid,
        user: this.user,
        activdades:[],
        puntototal: null,
        estado: 'eviado',
        fecha: new Date(),
    };

  }



  loadUSer(){
    const path ='UserEStudiante';
    this.firestoreService.getDoc<User>(path, this.uid).subscribe(res =>{
      this.user =res;
      this.loadActividad();
    });
  }

  getListo(){
    return this.list;
  }

    async addActividad(activity: Actividad){
      if(this.uid.length){

        const ver = this.list.activdades.find(res =>(res.id === activity.id));

        if (ver !== undefined) {
          const alert = await this.alertController.create({
            cssClass: 'normalidad',
            header: '    ALERTA   ',
            message: 'Esta actividad ya fue enviada </br></br><b>Porfavor realizar otra actividad</b>',
            buttons: [
              {
                text: 'Confirmar',
                handler: () => {
                  console.log('Confirm Okay');
                }
              }
            ]
          });
          await alert.present();
        }else{
          this.list.activdades.push(activity);
          this.presentToast('Activiada enviada y en proceso....');
        }
    }else{
      this.router.navigate(['/login']);
      return;
    }
    console.log('add Actividad =>',this.list);
    const path = 'UserEStudiante/' + this.uid + '/Realizado';
    await this.firestoreService.createDoc(this.list, path, this.list.id).then(() =>{
    });

  }

  realizado(){

  }

async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      color:'secondary',
    });
    toast.present();
  }

}


