import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';


const baseUrl = environment.baseUrl ; 
const corsUrl = environment.corsUrl ; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
  constructor(
    private http : HttpClient
  ) { }

  public authenticate(login : Login) : Observable<any>
  {
    const b64 = btoa(unescape(encodeURIComponent(`${login.username}:${login.password}`)));
    const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json',
    Authorization: `Basic ${b64}`,
    'Access-Control-Allow-Origin': '*',
    })};
    return this.http.get<any>(`${corsUrl}/${baseUrl}process-definition?latestVersion=true`,httpOptions)
  }
}
