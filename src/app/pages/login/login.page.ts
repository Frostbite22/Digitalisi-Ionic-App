import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  constructor(
    private formBuilder : FormBuilder,
    private loginService : LoginService,
    private storageService : StorageService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  loginForm = this.formBuilder.group(
    {
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    }
    );

    authenticate(username : string, password :string)
    {
      let user = new Login(username,password);
      this.loginService.authenticate(user).subscribe( (res) => {
        console.log(res);
        this.storageService.store(AuthConstants.AUTH,user) ;
        this.router.navigate(['process']);
        this.storageService.get(AuthConstants.AUTH).then(
          (mdp) => {
            console.log("successful :"+ mdp);
          }
        )
      },
      err => {
        console.log(err.status);
      }
    )}
}
