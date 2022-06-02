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

  public getTasksAssigned(key : string) : Observable<any>
    {
      const httpOptions = Header.getHeaders(key);
      return this.http.get<any>(`${baseUrl}/${assigned}${atob(key).split(':').shift()}`,httpOptions)
    }
}
