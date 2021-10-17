import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  newUser: User = {
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

  path = 'UserEStudiante';
  uid='';

  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router,
              public popoverController: PopoverController) {

                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null) {
                    this.uid =res.uid;
                    this.getInfo(this.uid);
                  }else{
                    console.log('no puedo pasar');
                    this.router.navigate(['/login']);
                  }
                });
              }




  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
  }

  getInfo(uid: string){
    this.firestoreService.getDoc<User>(this.path, uid).subscribe(res =>{
      this.newUser =res;
    });
  }

  async abirmenu(ev: any) {
        const popover = await this.popoverController.create({
        component: PopinfoComponent,
        cssClass: 'secondary',
        event: ev,
        translucent: true,
        mode: 'ios',
    });
    await popover.present();
  }

}
