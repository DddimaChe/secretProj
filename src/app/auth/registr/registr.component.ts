import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../user';
import {LoginService} from '../../service/login.service';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css']
})
export class RegistrComponent implements OnInit {


  form: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
              private usersService: UsersService) {
  }

 /* registration(email: string, name: string, password: string, surname: string) {
    email = email.trim();
    password = password.trim();
    name = name.trim();
    surname = surname.trim();
    this.loginService.registration({email, name, password, surname} as User)
      .subscribe(user => {
        this.user.push(user);
      });
  }
  */

  onSubmit() {
    const {email, password, name, surname } = this.form.value;
    const user = new User();

    this.usersService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }


    forbiddenEmails(control: FormControl): Promise<any> {
      return new Promise((resolve, reject) => {
        this.usersService.getUserByEmail(control.value)
          .subscribe((user: User) => {
            if (user) {
              resolve({forbiddenEmail: true});
            } else {
              resolve(null);
            }
          });
      });
  }


  ngOnInit() {
    this.form = new FormGroup({
      nameFormControl: new FormControl('', [
        Validators.required,
      ]),

      surnameFormControl: new FormControl('', [
        Validators.required,
      ]),

      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

  }
}
