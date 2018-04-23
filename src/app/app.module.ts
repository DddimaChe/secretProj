import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrComponent } from './auth/registr/registr.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {LoginService} from './service/login.service';
import {AuthService} from './service/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {UsersService} from './service/users.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    LoginService,
    AuthService,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
