import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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

  processVars : any;
  process : any ; 
  obj = [] ;
  @Input() jsonFormData: any;
  public myForm: FormGroup = this.fb.group({});

  createForm()
  {
    Object.entries(this.processVars).forEach( ([key,value]) => {
      this.myForm.addControl(key,new FormControl('', Validators.required));
      this.obj.push(
        {'type':value['type'],
         'name': key});
    });
  }



  constructor(
    private authService : AuthService,
    private route : ActivatedRoute,
    private processService : ProcessService,
    private loadingController : LoadingController,
    private storageService : StorageService,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.getProcessFormVars()
  }

  async getProcessFormVars() 
  {

    const loading = await this.loadingController.create({
      message : "Loading..",
      spinner : "bubbles"
    });

    await loading.present();

    const process_id = this.route.snapshot.paramMap.get('id');

    this.storageService.get(AuthConstants.AUTH).then((key) => {
    this.processService.getProcessFormVars(key,process_id).subscribe((res) => {
        this.processVars = res ; 
        this.createForm(); 
      });
    this.processService.getProcess(key,process_id).subscribe((res) => {
      this.process = res ;         
    });

    loading.dismiss();

    })
  }

  onSubmit()
  {
    let json = {}
    let attach =  {}
    Object.entries(this.myForm.value).forEach( ([key,value])=> {
    
    let inside = {
        "value" : `${value}`,
        "type" : "String",
        "valueInfo": {} 
      }
    attach[`${key}`]= inside ;   
      
    });
    json["variables"]= attach ; 
    
    const process_id = this.route.snapshot.paramMap.get('id');

    this.storageService.get(AuthConstants.AUTH).then((key) => {
      this.processService.submitForm(key,process_id,json).subscribe((res) => {
          console.log(res); 
        });
  
    });

  }

  logout()
  {
    this.authService.logout()
  }

}
