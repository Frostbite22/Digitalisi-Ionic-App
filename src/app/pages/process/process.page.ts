import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { ProcessService } from 'src/app/services/process.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {

  data? : any ;

  constructor(
    private route: ActivatedRoute,
     private router: Router,
     private processService : ProcessService,
     private storageService : StorageService,
     private loadingController : LoadingController,
     private authService : AuthService

  ) { }

  ngOnInit() {  
  this.getProcesses()
   
  }

  async getProcesses() 
  {

    const loading = await this.loadingController.create({
      message : "Loading..",
      spinner : "bubbles"
    });

      await loading.present();

      this.route.queryParams.subscribe(params => {
      try {
        this.data = this.router.getCurrentNavigation().extras.state.processes;
        loading.dismiss();
      } 
      catch 
      {
        this.storageService.get(AuthConstants.AUTH).then((key) => {
        this.processService.getProcesses(key).subscribe((res) => {
          this.data = res ; 
          loading.dismiss();
        });
        })

      }
      });
  }

  logout()
  {
    this.authService.logout();
  }
 
  

}
