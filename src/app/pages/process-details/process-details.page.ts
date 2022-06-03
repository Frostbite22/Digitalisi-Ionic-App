import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { ProcessService } from 'src/app/services/process.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.page.html',
  styleUrls: ['./process-details.page.scss'],
})
export class ProcessDetailsPage implements OnInit {

  processVars : any;
  process : any ; 
  obj = [] ;
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
    private fb : FormBuilder,
    private toastService : ToastService
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
        console.log(this.obj)
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
    let i = 0 ;
    Object.entries(this.myForm.value).forEach( ([key,value])=> {
    
      console.log(this.obj[i]['type']);
      
    let inside = {
        "value" : `${value}`,
        "type" : this.obj[i]['type'],
        "valueInfo": {} 
      }
    attach[`${key}`]= inside ;  
    i++ ;  
      
    });
    json["variables"]= attach ; 
    
    const process_id = this.route.snapshot.paramMap.get('id');

    this.storageService.get(AuthConstants.AUTH).then((key) => {
      this.processService.submitForm(key,process_id,json).subscribe((res) => {
        this.toastService.presentToast(`submitted sucessfully with Tracking id ${res.id}`);
        json = {} ;
        attach =  {};
        },
      err => {
        console.log(err.status);
        this.toastService.failToast("Unsucessful")
      });
  
    });

  }

  logout()
  {
    this.authService.logout()
  }

}
