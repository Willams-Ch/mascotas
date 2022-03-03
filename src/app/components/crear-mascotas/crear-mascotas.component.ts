import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-crear-mascotas',
  templateUrl: './crear-mascotas.component.html',
  styleUrls: ['./crear-mascotas.component.css']
})
export class CrearMascotasComponent implements OnInit {
  createMascota: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Agregar Mascota';

  constructor(private fb: FormBuilder, 
      private _mascotasService: MascotasService,
      private router: Router,
      private toastr: ToastrService,
      private aRoute: ActivatedRoute) {
    this.createMascota = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', Validators.required],
      propietario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.editar();
  }
  agregareditarmascota(){
    this.submitted = true;
    if(this.createMascota.invalid){
      return;
    }
    if(this.id == null){
      this.agregarMascota();
    }else{
      this.editarMascota(this.id);
    }
  }

  agregarMascota(){
    const mascota: any = {
      nombre: this.createMascota.value.nombre,
      raza: this.createMascota.value.raza,
      edad: this.createMascota.value.edad,
      propietario: this.createMascota.value.propietario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._mascotasService.agregarmascota(mascota).then(() => {
      console.log('Mascota insertada');
      this.toastr.success('La Mascota se registro con Exito...!!!', 'Mascota Registrada');
      this.router.navigate(['/lista-mascotas'])
    }).catch(error => {
      console.log(error);
    })
  }

  editarMascota(id: string){
    const mascota: any = {
      nombre: this.createMascota.value.nombre,
      raza: this.createMascota.value.raza,
      edad: this.createMascota.value.edad,
      propietario: this.createMascota.value.propietario,
      fechaActualizacion: new Date()
    }
    this._mascotasService.actualizarMascota(id, mascota).then(() => {
      this.toastr.info('La mascota se modifico con exito...!!!', 'Registro Modificado')
      this.router.navigate(['/lista-mascotas'])
    })
  }

  editar(){
    this.titulo = 'Editar Mascota'
    if(this.id !== null){
      this._mascotasService.editMascota(this.id).subscribe(data => {
        console.log(data);
        this.createMascota.setValue({
          nombre: data.payload.data()['nombre'],
          raza: data.payload.data()['raza'],
          edad: data.payload.data()['edad'],
          propietario: data.payload.data()['propietario']
        })
      })
    }
  }
}
