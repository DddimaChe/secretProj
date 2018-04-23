import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {RegistrComponent} from './auth/registr/registr.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrComponent},

  { path: '**', redirectTo: ''}
];

export  const  routing = RouterModule.forRoot(appRoutes);
