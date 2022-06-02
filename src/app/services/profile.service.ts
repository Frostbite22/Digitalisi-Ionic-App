import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Header } from '../utilities/header';
import { StorageService } from './storage.service';

const baseUrl = environment.baseUrl ; 
const corsUrl = environment.corsUrl ; 


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http : HttpClient,
    private storageService : StorageService,
    private router : Router

  ) { }

  public getProfile(key : string) : Observable<any>
  {
    const httpOptions = Header.getHeaders(key);
    return this.http.get<any>(`${corsUrl}/${baseUrl}/user/${atob(key).split(':').shift()}/profile`,httpOptions)
  }


}
