import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public database: AngularFirestore) {}

  createDoc(data: any, path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).set(data);
  }

  getDoc(path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).update(data);
  }
}