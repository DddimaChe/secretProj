import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../user';
import {LoginService} from '../../service/login.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css']
})
export class RegistrComponent implements OnInit {


  form: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
            private auth: AuthService) {
  }

  onSubmit() {
    const data = this.form.value;
    const user = new User(data['emailFormControl'], 
                          data['passwordFormControl'], 
                          data['nameFormControl'], 
                          data['lastNameFormControl'],
                          'user');

    this.loginService.registration(user)
      .subscribe(res =>{
        if (res['status'] == 'Ok'){
          this.auth.login();
          this.loginService.setToken(res['token']);
          console.log(res['token']);
        } else {
          console.log("Email is busy");
        }
      });                      
  }


  ngOnInit() {
    this.form = new FormGroup({
      nameFormControl: new FormControl('', [
        Validators.required,
      ]),

      lastNameFormControl: new FormControl('', [
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
