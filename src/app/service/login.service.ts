import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  private url = 'http://localhost:8080/auth/';
  private token = '';

  constructor(
    private http: HttpClient,
  ) {
  }

  login(user: User){
    return this.http.post(this.url + 'login', user, httpOptions);
  }

  registration(user: User){
    return this.http.post(this.url + 'registration', user, httpOptions);
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}
