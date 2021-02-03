import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpOptions } from '../entities/http-options';
import { environment } from '../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private url: string;
  private saving: boolean;

  constructor(
    private storage: StorageService,
    public http: HttpClient
  ) {
    this.url = environment.urlAppApi;
  }
  getPosts(param:string){
    return new Promise(resolve=>{
      this.http.get(this.url + param).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }
}
