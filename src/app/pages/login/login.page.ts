import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private storageService : StorageService,
    private router : Router,
    private toastService : ToastService
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
      this.authService.authenticate(user).subscribe( (res) => {
        this.storageService.store(AuthConstants.AUTH,user) ;
        let navigationExtras : NavigationExtras = {
          state: {
            processes: res
          }
        };
    
        this.router.navigate(['process'],navigationExtras);
        this.storageService.get(AuthConstants.AUTH).then(
          (mdp) => {
            this.toastService.presentToast("Logged in Successfully ")
          }
        )
      },
      err => {
        console.log(err.status);
        this.toastService.failToast("Unsucessful Login")
      }
    )}

  
}
