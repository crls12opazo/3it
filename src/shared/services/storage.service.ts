import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Divisa } from '../entities/divisa';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private defaultLang: BehaviorSubject<string> = new BehaviorSubject('es'); // starting app default as 'es'
  private isRegister: BehaviorSubject<boolean> = new BehaviorSubject(undefined); // starting app default as 'undefined'
  
  private divisa: BehaviorSubject<Divisa> = new BehaviorSubject(undefined); // starting app default as 'undefined'

  constructor(private platform: Platform, private storage: Storage) {
    this.platform.ready().then(async () => {
      const divisa = await this.get('Divisa');
      this.divisa.next(divisa);
    });
  }
 
 

  
  getDivisa(): Observable<Divisa> {
    return this.divisa.asObservable();
  }

   

  private activeObservables(key: string, value: any) {
    switch (key) {
      case 'Divisa':
        this.divisa.next(value);
        break;
    }
  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
    this.activeObservables(key, value);
  }

  async get(key: string): Promise<any> {
    const value = await this.storage.get(key);
    return value;
  }

  async remove(key: string) {
    await this.storage.remove(key);
  }

  async clear() {
    await this.storage.clear();
  }
}
