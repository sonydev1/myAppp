import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {


  constructor(public firebaseauthService: FirebaseauthService,
    public router: Router,
    private pop: PopoverController) { }


  ngOnInit() {}


  editar(){
    this.router.navigate(['/editar-perfil']);
    this.pop.dismiss();
  }


  salir(){
    this.firebaseauthService.logout();
    this.router.navigate(['/login']);
    this.pop.dismiss();
  }

}
