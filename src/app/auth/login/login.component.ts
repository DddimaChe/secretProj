import {Router, ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../../user';
import {AuthService} from '../../service/auth.service';
import {Message} from '../../models/message.model';
import {LoginService} from '../../service/login.service';


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
    private loginService: LoginService) {

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

    onSubmit() {
      const formData = this.form.value;
      const user = new User(formData['emailFormControl'], formData['passwordFormControl'], '', '', '');

      this.loginService.login(user)
        .subscribe(res => {
          if(res['status'] == 'Ok'){
            this.loginService.setToken(res['token']);
            this.authService.login();
            // add here navigation
          } else {
            console.log("Denied"); //add here some message for user
          }
        });
    }


  ngOnInit() {
  }

}
