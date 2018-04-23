import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../user';
import {Injectable} from '@angular/core';

@Injectable()
export class UsersService {
  private url = 'http://localhost:4200/login/';
  constructor(public http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.post(this.url + 'user', email, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
    createNewUser(user: User): Observable<any> {
      return this.http.post(this.url, user);
    }

}
