import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent} from './components/lista-mascotas/lista-mascotas.component';
import { CrearMascotasComponent } from './components/crear-mascotas/crear-mascotas.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista-mascotas', pathMatch: 'full' },
  { path: 'lista-mascotas', component: ListaMascotasComponent },
  { path: 'crear-mascotas', component: CrearMascotasComponent },
  { path: 'edit-mascotas/:id', component: CrearMascotasComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
