import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { ProcessService } from 'src/app/services/process.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.page.html',
  styleUrls: ['./process-details.page.scss'],
})
export class ProcessDetailsPage implements OnInit {

  processVars : any 

  constructor(
    private authService : AuthService,
    private route : ActivatedRoute,
    private processService : ProcessService,
    private storageService : StorageService
  ) { }

  ngOnInit() {
    this.getProcessFormVars()
  }

  getProcessFormVars() 
  {
    const process_id = this.route.snapshot.paramMap.get('id');

    this.storageService.get(AuthConstants.AUTH).then((key) => {
    this.processService.getProcessFormVars(key,process_id).subscribe((res) => {
        this.processVars = res ; 
        console.log(res)
      });
    })

  }

  logout()
  {
    this.authService.logout()
  }

}
