import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  data? : any ;
  username? : string ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService : TaskService ,
    private storageService : StorageService,
    private loadingController : LoadingController,
    private authService : AuthService

  ) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks(event? : InfiniteScrollCustomEvent) 
  {

    const loading = await this.loadingController.create({
      message : "Loading..",
      spinner : "bubbles"
    });

      await loading.present();

      
        this.storageService.get(AuthConstants.AUTH).then((key) => {
        this.username = atob(key).split(':').shift() ;
        this.taskService.getTasks(key).subscribe( (res) => {
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
