import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Header } from '../utilities/header';
import { StorageService } from './storage.service';


const baseUrl = environment.baseUrl ; 
const corsUrl = environment.corsUrl ; 
const task = environment.task ; 
const assigned = environment.assigned ; 
const submitUri = environment.submitUri ; 
const taskFormVars = environment.processFormVars ;

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(
    private http : HttpClient,
    private storageService : StorageService,
    private router : Router
  ) { }

  public getTasks(key : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      return this.http.get<any>(`${corsUrl}/${baseUrl}/${task}`,httpOptions)
    }

  public getAssignedTasks(key : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      return this.http.get<any>(`${corsUrl}/${baseUrl}/${assigned}${atob(key).split(':').shift()}`,httpOptions)
    }

  public claimTask(key :string, task_id : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      let user_id = atob(key).split(':').shift();
      let data = {
        "userId": user_id
      }
      return this.http.post<any>(`${corsUrl}/${baseUrl}/task/${task_id}/claim`,data,httpOptions)
    }

    public getTaskFormVars(key : string, process_id : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      return this.http.get<any>(`${corsUrl}/${baseUrl}/${task}/${process_id}/${taskFormVars}`,httpOptions)
    }
  

    public getTask(key : string, task_id : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      return this.http.get<any>(`${corsUrl}/${baseUrl}/${task}/${task_id}`,httpOptions)
    }
  
    public submitForm(key : string , task_id : string , data : any) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      return this.http.post<any>(`${corsUrl}/${baseUrl}/task/${task_id}/${submitUri}`,data,httpOptions)
  
    }

  
  
    public unclaimTask(key :string, task_id : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      let user_id = atob(key).split(':').shift();
      let data = {
        "userId": user_id
      }
      return this.http.post<any>(`${corsUrl}/${baseUrl}/task/${task_id}/unclaim`,data,httpOptions)
    }

}
