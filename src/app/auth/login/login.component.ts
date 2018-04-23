import {Router, ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../../user';
import {AuthService} from '../../service/auth.service';
import {Message} from '../../models/message.model';
import {LoginService} from '../../service/login.service';
import {UsersService} from '../../service/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private usersService: UsersService) {

    this.form = new FormGroup({
      emailFormControl:  new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl:  new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
  }

    private showMessage(message: Message) {
      this.message = message;
    }

/*
    upLogin(email: string, password: string) {
      email = email.trim();
      password = password.trim();
      this.loginService.login({ email , password } as User)
        .subscribe(user => {
          this.user.push(user);
        });
    }
*/
    onSubmit() {
      const formData = this.form.value;

      this.usersService.getUserByEmail(formData.email)
        .subscribe((user: User) => {
          if (user) {
            if (user.password === formData.password) {
            this.authService.login();
            this.router.navigate(['/lichKab']);
            } else {
              this.showMessage({
                text: 'Пароль не верный',
                type: 'danger'
              });
            }
          } else {
            this.showMessage({
              text: 'Такого пользователя не существует',
              type: 'danger'
            });
          }
        });
    }


  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Теперь вы можете зайти в систему',
            type: 'success'
          });
        } else  if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работы с системой вам нужно залогиниться',
            type: 'warning'
          });
        }
      });



  }

}
