import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-assigned-detail.page.html',
  styleUrls: ['./task-assigned-detail.page.scss'],
})
export class TaskAssignedDetailPage implements OnInit {

  taskVars : any;
  task : any ; 
  obj = [] ;
  public myForm: FormGroup = this.fb.group({});

  createForm()
  {
    Object.entries(this.taskVars).forEach( ([key,value]) => {
      this.myForm.addControl(key,new FormControl('', Validators.required));
      this.obj.push(
        {'type':value['type'],
         'name': key});
    });
  }



  constructor(
    private authService : AuthService,
    private route : ActivatedRoute,
    private taskService : TaskService,
    private loadingController : LoadingController,
    private storageService : StorageService,
    private fb : FormBuilder,
    private toastService : ToastService
  ) { }

  ngOnInit() {
    this.getTaskFormVars()
  }

  async getTaskFormVars() 
  {

    const loading = await this.loadingController.create({
      message : "Loading..",
      spinner : "bubbles"
    });

    await loading.present();

    const task_id = this.route.snapshot.paramMap.get('id');

    this.storageService.get(AuthConstants.AUTH).then((key) => {
    this.taskService.getTaskFormVars(key,task_id).subscribe((res) => {
        this.taskVars = res ; 
        this.createForm(); 
        console.log(this.obj)
      });
    this.taskService.getTask(key,task_id).subscribe((res) => {
      this.task = res ;         
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
    
    
      
    let inside = {
        "value" : `${value}`,
        "type" : this.obj[i]['type'],
        "valueInfo": {} 
      }
    attach[`${key}`]= inside ;  
    i++ ;  
      
    });
    json["variables"]= attach ; 
    
    const task_id = this.route.snapshot.paramMap.get('id');

    this.storageService.get(AuthConstants.AUTH).then((key) => {
      this.taskService.submitForm(key,task_id,{}).subscribe((res) => {
        this.toastService.presentToast(`submitted sucessfully with Tracking id ${res.id}`);
        json = {} ;
        attach =  {};
        },
      err => {
        console.log(err.status);
        console.log(json);
        this.toastService.failToast("Unsucessful")
      });
  
    });

  }

  unclaimTask()
  {
    const task_id = this.route.snapshot.paramMap.get('id');
    console.log(task_id);
    this.storageService.get(AuthConstants.AUTH).then((key) => {
      this.taskService.unclaimTask(key,task_id).subscribe((res)=> {
        this.toastService.presentToast(`Task is unclaimed successfully`);
      });
    })
  }

  logout()
  {
    this.authService.logout()
  }


}
