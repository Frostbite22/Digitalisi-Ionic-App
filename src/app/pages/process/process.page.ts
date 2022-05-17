import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
     private storageService : StorageService
  ) { }

  ngOnInit() {  
  this.getProcesses()
   
  }

  getProcesses() : void
  {
      this.route.queryParams.subscribe(params => {
      try {
        this.data = this.router.getCurrentNavigation().extras.state.processes;
      } 
      catch 
      {
        this.storageService.get(AuthConstants.AUTH).then((key) => {
        this.data = this.processService.getProcesses(key);
        })
      }
      });
    }
 
  

}
