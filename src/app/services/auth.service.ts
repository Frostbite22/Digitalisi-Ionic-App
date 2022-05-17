import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { Login } from '../models/login';
import { Header } from '../utilities/header';
import { ProcessService } from './process.service';
import { StorageService } from './storage.service';


const baseUrl = environment.baseUrl ; 
const corsUrl = environment.corsUrl ; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(
    private http : HttpClient,
    private storageService : StorageService,
    private router : Router,
    private processService : ProcessService
  ) { }

  public authenticate(login : Login) : Observable<any>
  {
    const b64 = btoa(unescape(encodeURIComponent(`${login.username}:${login.password}`)));
    return this.processService.getProcesses(b64);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
    this.router.navigate(['/login']);
    });
  }
    
}
