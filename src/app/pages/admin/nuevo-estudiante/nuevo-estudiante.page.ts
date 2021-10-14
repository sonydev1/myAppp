import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from '../../../services/firestore.service';

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
    telefono: '',
    programa: '',
    foto: '../../../../assets/perfil-defaul.png',
    puntoAcomulado: 0,
    puntoTotal: 0,
  };


  newFile = '';


  optionSelect: string;
  tipodocu: string;
  path = 'UserEStudiante';

  constructor(
    public firestorageService: FirestorageService,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
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


  async guardarUser() {
    const name = this.newUser.ndocumento;
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
      this.presentToast('Guardado con exito');
      this.initUser();
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
    telefono: '',
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
