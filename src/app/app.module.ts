import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component'

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    UsuariosComponent,
    FilterPipe,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
