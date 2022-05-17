import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessGuard implements CanActivate {

  constructor(public storageService : StorageService,
    public router : Router) {}
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise( resolve => {
      this.storageService
      .get(AuthConstants.AUTH)
      .then( res => {
        if (res) 
        {
          resolve(true);
        }

        else{ 
          this.router.navigate(['/login']);
          resolve(false);
        }  
      })
      .catch( err => {
        resolve(false);
        this.router.navigate(['/login']);

      });
    });
  }
  
}
