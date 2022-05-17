import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Storage } from '@capacitor/storage';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, login : Login)
  {
    const b64 = btoa(unescape(encodeURIComponent(`${login.username}:${login.password}`)));
    await Storage.set({
      key : storageKey,
      value : b64
    });
  }

  async get(storageKey : string)
  {
    const ret = await Storage.get({key : storageKey});
    return ret.value ;
    //return decodeURIComponent(escape(atob( ret.value )));
  }

  async removeStorageItem(storageKey: string) 
  {
    await Storage.remove({ key: storageKey });
  }
    
  // Clear storage
  async clear() 
  {
  await Storage.clear();
  }
}
