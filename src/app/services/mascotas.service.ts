import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private firestore: AngularFirestore) { }

  agregarmascota(mascota: any): Promise<any> {
    return this.firestore.collection('mascotas').add(mascota);
  }
  getMascotas(): Observable<any> {
    return this.firestore.collection('mascotas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  eliminarMascota(id: string): Promise<any> {
    return this.firestore.collection('mascotas').doc(id).delete();
  }
  editMascota(id: string): Observable<any> {
    return this.firestore.collection('mascotas').doc(id).snapshotChanges();
  }
  actualizarMascota(id: string, data: any): Promise<any> {
    return this.firestore.collection('mascotas').doc(id).update(data);
  }
}
