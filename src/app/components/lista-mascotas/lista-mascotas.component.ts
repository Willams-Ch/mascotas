import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {
  mascotas: any[] = [];

  constructor(private _mascotasService: MascotasService,
    private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.getMascotas()
  }

  getMascotas() {
    this._mascotasService.getMascotas().subscribe(data => {
      this.mascotas = [];
      data.forEach((element:any) => {
        console.log(element.payload.doc.data());
        this.mascotas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
      console.log(this.mascotas);
    })
  }
  eliminarMascota(id: string){
    this._mascotasService.eliminarMascota(id).then(() =>{
      console.log('Mascota Eliminada');
      this.toastr.error('La mascota se elimino con exito...!!!', 'Registro Eliminado')
    }).catch (error =>{
      console.log(error);
    })
  }
}
