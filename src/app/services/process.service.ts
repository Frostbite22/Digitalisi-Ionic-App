import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Header } from '../utilities/header';
import { StorageService } from './storage.service';



const baseUrl = environment.baseUrl ; 
const corsUrl = environment.corsUrl ; 
const processesUri = environment.processesUri ;

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(
    private http : HttpClient,
    private storageService : StorageService,
    private router : Router

  ) { }


  public getProcesses(key : string) : Observable<any>
  {
    const httpOptions = Header.getHeaders(key);
    return this.http.get<any>(`${corsUrl}/${baseUrl}${processesUri}`,httpOptions)
  }

}
