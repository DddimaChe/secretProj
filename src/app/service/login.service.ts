import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  private url = 'http://localhost:4200/login/';

  constructor(
    private http: HttpClient,
  ) {
  }


  login(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }
  registration(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }
}
