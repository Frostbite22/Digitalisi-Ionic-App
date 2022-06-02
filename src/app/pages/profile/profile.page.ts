import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { ProcessService } from 'src/app/services/process.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data? : any ;

  constructor(
    private route: ActivatedRoute,
     private router: Router,
     private profileService : ProfileService,
     private storageService : StorageService,
     private loadingController : LoadingController,
     private authService : AuthService

  ) { }

  ngOnInit() {  
  this.getProfile()
  }

  

  async getProfile() 
  {

    const loading = await this.loadingController.create({
      message : "Loading..",
      spinner : "bubbles"
    });

      await loading.present();

        this.storageService.get(AuthConstants.AUTH).then((key) => {
        this.profileService.getProfile(key).subscribe( (res) => {
          this.data = res ; 
        }) 
      });

      loading.dismiss();
      
 
  }

  logout()
  {
    this.authService.logout();
  }
 
  


}
