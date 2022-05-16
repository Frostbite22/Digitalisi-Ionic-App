import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  constructor(
    private formBuilder : FormBuilder,
    private loginService : LoginService
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
      })
    }
}
