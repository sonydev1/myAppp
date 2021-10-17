import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-estudiante',
  templateUrl: './nuevo-estudiante.page.html',
  styleUrls: ['./nuevo-estudiante.page.scss'],
})
export class NuevoEstudiantePage implements OnInit {
  newUser: User = {
    uid: '',
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    ndocumento: '',
    email: '',
    telefono: null,
    programa: '',
    foto: '../../../../assets/perfil-defaul.png',
    puntoAcomulado: 0,
    puntoTotal: 0,
  };


  newFile = '';


  optionSelect: string;
  tipodocu: string;
  path = 'UserEStudiante';

  constructor(private firestorageService: FirestorageService,
    private firebaseauthService: FirebaseauthService,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private router: Router,
    private alert: AlertController
  ) {}

  async ngOnInit() {
        const alert = await this.alert.create({
          cssClass: 'my-custom-class',
          header: 'IMPORTANTE',
          message: 'Tu contraseña de inico de sesion al princio es tu numero de documento, luego la puedes cambiar .',
          buttons: ['OK']
        });
        await alert.present();
    }


  async imagePefil(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newUser.foto = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async registrarse() {
    if(this.guardarUser === this.initUser){

      this.presentToast('error al registrase');
    }else{
    const credenciales = {
      email: this.newUser.email,
      password: this.newUser.ndocumento,
    };
    const res = await this.firebaseauthService.resgirtrar(credenciales.email, credenciales.password);
    console.log(res);
    const uid = await this.firebaseauthService.getUid();
    this.newUser.uid = uid;
      this.guardarUser();
      console.log(uid);
  }
  }

  async guardarUser() {
    const name = this.newUser.uid;
    if (this.imagePefil !== undefined) {
      const res = await this.firestorageService.uploadImage(
        this.newFile, this.path,name);
        this.newUser.foto = res;
      }
      const rest = await this.firestorageService.uploadImage(
        this.newFile,
        this.path,
        name
      );
      this.newUser.foto = rest;
    this.firestoreService
    .createDoc(this.newUser, this.path, this.newUser.uid)
    .then((res) => {
      this.presentToast('Ristrado con exito');
      this.router.navigate(['/home']);
      })
      .catch((error) => {});
    }

  valorprograma(event: CustomEvent) {
    const pro = (this.optionSelect = event.detail.value);
    this.newUser.programa = pro;
  }
  valordocumento(event: CustomEvent) {
    const tido = (this.tipodocu = event.detail.value);
    this.newUser.tipoDocumento = tido;
  }

  initUser(){
    this.newUser ={
      uid: '',
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    ndocumento: '',
    email: '',
    telefono: 0,
    programa: '',
    foto: '../../../../assets/perfil-defaul.png',
    puntoAcomulado: 0,
    puntoTotal: 0,
  };
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
