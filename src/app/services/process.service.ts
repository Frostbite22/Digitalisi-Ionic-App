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
const processFormVars = environment.processFormVars ; 
const processDef = environment.processDef ; 
const submitUri = environment.submitUri ; 

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
    return this.http.get<any>(`${corsUrl}/${baseUrl}/${processDef}/${processesUri}`,httpOptions)
  }

  public getProcessFormVars(key : string, process_id : string) : Observable<any>
  {
    const httpOptions = Header.getHeaders(key);
    return this.http.get<any>(`${corsUrl}/${baseUrl}/${processDef}/${process_id}/${processFormVars}`,httpOptions)
  }

  public getProcess(key : string, process_id : string) : Observable<any>
  {
    const httpOptions = Header.getHeaders(key);
    return this.http.get<any>(`${corsUrl}/${baseUrl}/${processDef}/${process_id}`,httpOptions)
  }

  public submitForm(key : string , process_id : string , data : any) : Observable<any>
  {
    const httpOptions = Header.getHeaders(key);
    return this.http.post<any>(`${corsUrl}/${baseUrl}/${processDef}/${process_id}/${submitUri}`,data,httpOptions)

  }

}
