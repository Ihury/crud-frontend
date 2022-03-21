import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: "create", component: CreateComponent },
  { path: "create/:id", component: CreateComponent },
  { path: "delete/:id", component: DeleteComponent },
  { path: "", component: UsuariosComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
